"use server";
import prisma from "@/lib/prisma";
import type { Document as LangchainDocument } from "@langchain/core/documents";
import { ChatType } from "@/types";
import { getYouTubeVideoTitle, getYouTubeVideoTitleOEmbed, getYouTubeVideoTitleMetaData } from "@/lib/youtube";

export async function getUserOldSummaries(id: string) {
  return await prisma.summary.findMany({
    where: { user_id: id },
    select: { id: true, url: true, created_at: true, title: true },
    orderBy: { created_at: "desc" },
  });
}

export async function getSummary(id: string): Promise<ChatType | null> {
  const summary = await prisma.summary.findUnique({
    where: {
      id: id,
    },
  });
  return summary;
}

export async function addSummary({ url, user_id }: { url: string; user_id: string }) {
  const { YoutubeLoader } = await import("@langchain/community/document_loaders/web/youtube");
  let text: LangchainDocument<Record<string, unknown>>[] = [];
  let videoTitle = "No Title found!";
  
  try {
    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });
    text = await loader.load();
  } catch {
    throw new Error("No transcript available for this video. Please try another video.");
  }

  // Try to get title using our robust method (includes youtubei.js + youtube-meta-data + oEmbed)
  try {
    videoTitle = await getYouTubeVideoTitle(url);
  } catch (titleError) {
    console.error("Primary title extraction failed:", titleError);
    
    // Fallback to youtube-meta-data method specifically
    try {
      videoTitle = await getYouTubeVideoTitleMetaData(url);
    } catch (metaDataError) {
      console.error("youtube-meta-data title extraction failed:", metaDataError);
      
      // Fallback to oEmbed method
      try {
        videoTitle = await getYouTubeVideoTitleOEmbed(url);
      } catch (oembedError) {
        console.error("oEmbed title extraction failed:", oembedError);
        
        // Final fallback to YoutubeLoader metadata if available
        videoTitle = (text[0]?.metadata?.title as string) ?? "No Title found!";
      }
    }
  }
  
  const chat = await prisma.summary.create({
    data: {
      url,
      user_id,
      title: videoTitle,
    },
  });
  return chat;
}

export async function summarizeUrl({ url, id }: { url: string; id: string }) {
  const { YoutubeLoader } = await import("@langchain/community/document_loaders/web/youtube");
  const { loadSummarizationChain } = await import("langchain/chains");
  const { TokenTextSplitter } = await import("langchain/text_splitter");
  const { PromptTemplate } = await import("@langchain/core/prompts");
  const { summaryTemplate } = await import("@/lib/prompts");
  const { gptModal } = await import("@/lib/langchain");
  const { updateSummary } = await import("@/actions/updateSummary");
  let text: LangchainDocument<Record<string, unknown>>[];
  try {
    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });
    text = await loader.load();
  } catch {
    throw new Error("No transcript available for this video. Please try another video.");
  }
  const splitter = new TokenTextSplitter({
    chunkSize: 15000,
    chunkOverlap: 250,
  });
  const docsSummary = await splitter.splitDocuments(text);
  const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);
  const summaryChain = loadSummarizationChain(gptModal, {
    type: "map_reduce",
    verbose: true,
    combinePrompt: summaryPrompt,
  });
  const res = await summaryChain.invoke({ input_documents: docsSummary });
  await updateSummary(id, res?.text);
  return res?.text;
}