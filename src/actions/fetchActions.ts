"use server";
import prisma from "@/lib/prisma";
import type { Document as LangchainDocument } from "@langchain/core/documents";
import { ChatType } from "@/types";
import { getYouTubeVideoTitle } from "@/lib/youtube";
import { debugLog, productionLog, errorLog, getEnvironmentInfo } from "@/lib/debug";
import { unstable_cache } from "next/cache";

export const getUserOldSummaries = unstable_cache(
  async (id: string) => {
    try {
      if (!id) {
        console.error('getUserOldSummaries: Invalid user ID provided');
        return [];
      }
      
      const summaries = await prisma.summary.findMany({
        where: { user_id: id },
        select: { id: true, url: true, created_at: true, title: true, author: true, view_count: true },
        orderBy: { created_at: "desc" },
      });
      
      return summaries || [];
    } catch (error) {
      console.error('Error fetching user summaries:', error);
      // Return empty array instead of throwing to prevent server crash
      return [];
    }
  },
  ['user-summaries'],
  {
    revalidate: 300, // Cache for 5 minutes
    tags: ['user-summaries']
  }
);

export async function getSummary(id: string): Promise<ChatType | null> {
  try {
    if (!id) {
      console.error('getSummary: Invalid summary ID provided');
      return null;
    }
    
    const summary = await prisma.summary.findUnique({
      where: {
        id: id,
      },
    });
    return summary;
  } catch (error) {
    console.error('Error fetching summary:', error);
    // Return null instead of throwing to prevent server crash
    return null;
  }
}

export async function addSummary({ url, user_id }: { url: string; user_id: string }) {
  const { YoutubeLoader } = await import("@langchain/community/document_loaders/web/youtube");
  let text: LangchainDocument<Record<string, unknown>>[] = [];
  let videoTitle = "No Title found!";
  let videoAuthor: string | null = null;
  let viewCount: number | null = null;
  
  productionLog(`Starting title extraction for URL: ${url}`, getEnvironmentInfo());
  
  try {
    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });
    text = await loader.load();
    debugLog(`YoutubeLoader successfully loaded transcript`);
    
    // Extract metadata from YoutubeLoader
    const metadata = text[0]?.metadata;
    if (metadata) {
      videoAuthor = (metadata.author as string) || null;
      viewCount = (metadata.view_count as number) || null;
      debugLog(`Extracted metadata - Author: ${videoAuthor}, Views: ${viewCount}`);
    }
  } catch (loaderError) {
    errorLog(`YoutubeLoader failed`, loaderError);
    throw new Error("No transcript available for this video. Please try another video.");
  }

  // Try to get title using our robust method
  try {
    debugLog(`Starting title extraction...`);
    videoTitle = await getYouTubeVideoTitle(url);
    productionLog(`Title extraction result: "${videoTitle}"`);
    
    if (videoTitle === "No Title Found") {
      debugLog(`Primary title extraction failed, trying YoutubeLoader metadata...`);
      // Last resort: try YoutubeLoader metadata
      const loaderTitle = (text[0]?.metadata?.title as string);
      if (loaderTitle && loaderTitle.trim()) {
        videoTitle = loaderTitle;
        productionLog(`Using YoutubeLoader metadata title: "${videoTitle}"`);
      }
    }
  } catch (titleError) {
    errorLog(`All title extraction methods failed`, titleError);
    
    // Final fallback to YoutubeLoader metadata if available
    const loaderTitle = (text[0]?.metadata?.title as string);
    if (loaderTitle && loaderTitle.trim()) {
      videoTitle = loaderTitle;
      productionLog(`Using YoutubeLoader metadata as final fallback: "${videoTitle}"`);
    } else {
      debugLog(`No title could be extracted, using default`);
    }
  }
  
  productionLog(`Final metadata - Title: "${videoTitle}", Author: ${videoAuthor}, Views: ${viewCount}`);
  
  const chat = await prisma.summary.create({
    data: {
      url,
      user_id,
      title: videoTitle,
      author: videoAuthor,
      view_count: viewCount,
    },
  });
  
  debugLog(`Summary created with ID: ${chat.id}`);
  
  // Revalidate the cache after adding a new summary
  try {
    const { revalidateTag } = await import('next/cache');
    revalidateTag('user-summaries');
  } catch (error) {
    console.error('Failed to revalidate cache:', error);
  }
  
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