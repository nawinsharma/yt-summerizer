import type { Document as LangchainDocument } from "@langchain/core/documents";

export async function summarizeUrl({ url, id }: { url: string; id: string }) {
    const { YoutubeLoader } = await import("@langchain/community/document_loaders/web/youtube");
    const { loadSummarizationChain } = await import("langchain/chains");
    const { TokenTextSplitter } = await import("langchain/text_splitter");
    const { PromptTemplate } = await import("@langchain/core/prompts");
    const { summaryTemplate } = await import("@/lib/prompts");
    const { gptModal } = await import("@/lib/langchain");
    const { updateSummary } = await import("@/actions/updateSummary");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let text: LangchainDocument<Record<string, any>>[] = [];
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