"use client";
import React, { useEffect, useState, useCallback } from "react";
import SummarizeLoader from "./SummarizeLoader";
import { toast } from "sonner";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { summarizeUrl } from "@/actions/fetchActions";
import { ChatType } from "@/types";

export default function SummaryBase({ summary }: { summary: ChatType | null }) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const router = useRouter();

  const summarize = useCallback(async () => {
    try {
      if (response.length > 0) {
        setLoading(false);
        return true;
      }
      if (!summary || !summary.url || !summary.id) {
        toast.error("Missing summary information. Cannot summarize.");
        setLoading(false);
        return;
      }
      const res = await summarizeUrl({ url: summary.url, id: summary.id });
      setLoading(false);
      if (res) {
        setResponse(res);
      }
    } catch (error: unknown) {
      setLoading(false);
      toast.error((error as Error).message || "Something not right!");
    }
  }, [response.length, summary]);

  useEffect(() => {
    if (summary && summary.response) {
      setResponse(summary.response);
      setLoading(false);
    } else if (summary) {
      summarize();
    } else {
      setLoading(false);
    }
  }, [summary, summarize]);

  // Helper to extract YouTube video ID
  function getYouTubeId(url?: string): string | null {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^/\]+/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  }

  if (!summary) {
    return (
      <div className="w-full min-h-screen bg-black px-6 py-12 flex items-center justify-center">
        <div className="text-center text-white py-12">
          <p className="text-xl">No summary data provided.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 cursor-pointer text-blue-300 hover:text-blue-400 font-medium text-lg px-4 py-2 rounded transition-colors bg-blue-900/40 border border-blue-700 hover:bg-blue-800/60 shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </Button>
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {summary.title || "Untitled"}
            </h1>
          </div>
          {/* YouTube Preview (moved here) */}
          {summary.url && getYouTubeId(summary.url) && (
            <div className="mb-6 flex justify-center">
              <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeId(
                    summary.url
                  )}`}
                  title="YouTube video preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
          {summary.url && (
            <Badge className="bg-blue-950 text-blue-200 border-blue-900 px-4 py-2 text-sm">
              <Link
                href={summary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-200"
              >
                {summary.url}
              </Link>
            </Badge>
          )}
        </div>
        {/* Content */}
        <div className="bg-gray-950 max-w-9xl mx-auto rounded-2xl p-8 border border-gray-600 shadow-xl">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <SummarizeLoader />
            </div>
          ) : response ? (
            <div className="prose prose-lg prose-invert max-w-none">
              <Markdown
                components={{
                  h1: ({ ...props }) => (
                    <h1
                      className="text-3xl font-bold mb-6 text-white border-b border-gray-500 pb-3"
                      {...props}
                    />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="text-2xl font-semibold mt-8 mb-4 text-blue-300"
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3
                      className="text-xl font-medium mt-6 mb-3 text-purple-300"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p
                      className="text-white mb-4 leading-relaxed text-lg"
                      {...props}
                    />
                  ),
                  strong: ({ ...props }) => (
                    <strong className="text-pink-400 font-bold" {...props} />
                  ),
                  em: ({ ...props }) => (
                    <em className="text-blue-300 font-medium" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="text-white mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="text-white mb-4 space-y-2" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="text-white leading-relaxed" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a
                      className="text-blue-400 underline hover:text-blue-300"
                      {...props}
                    />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-4 border-purple-500 pl-4 italic text-purple-200 my-4 bg-purple-900/20"
                      {...props}
                    />
                  ),
                  code: ({ ...props }) => (
                    <code
                      className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm"
                      {...props}
                    />
                  ),
                  pre: ({ ...props }) => (
                    <pre
                      className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4 border border-gray-600"
                      {...props}
                    />
                  ),
                }}
              >
                {response}
              </Markdown>
            </div>
          ) : (
            <div className="text-center text-white py-12">
              <p className="text-xl">No summary available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
