"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { addSummary } from "@/actions/fetchActions";
import { UserSummaries } from "@/types";

export default function UrlInput({ user, onSummaryAdded }: { user: { id: string }; onSummaryAdded?: (summary: UserSummaries) => void }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ url?: string; user_id?: string }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);
      const newChat = await addSummary({ url: url, user_id: user?.id });
      if (newChat) {
        if (onSummaryAdded) onSummaryAdded(newChat);
        toast.success("Url is correct redirecting you to the summarize window");
        router.push(`/summarize/?id=${newChat.id}`);
      }
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error && error.message?.includes("No transcript available")) {
        setErrors({ url: error.message });
      } else {
        toast.error(error instanceof Error ? error.message : "An error occurred");
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-18 w-full">
      {/* Enhanced Search Bar UI */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-md group">
        <Input
          type="text"
          className="h-14 rounded-full border-2 border-blue-400 shadow-lg px-12 pr-16 w-full text-lg font-semibold text-gray-100 placeholder-gray-200 outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all"
          placeholder="🔍 Search or paste your YouTube URL…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          aria-label="YouTube URL search input"
        />
        {/* Loading spinner or submit button */}
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white hover:bg-gray-800 cursor-pointer rounded-full p-2 shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed z-20"
          disabled={loading}
          aria-label="Submit search"
        >
          {loading ? <Loading /> : <Search className="h-6 w-6" />}
        </Button>
      </form>
      <span className="text-red-500 mt-2 min-h-[1.5rem]">{errors?.url}</span>
    </div>
  );
}
