"use client";
import React, { useEffect, useState, useCallback } from "react";
import OldSummaryCard from "./OldSummaryCard";
import UrlInput from "./UrlInput";
import { getUserOldSummaries } from "@/actions/fetchActions";
import { User } from "@/lib/types";
import { UserSummaries } from "@/types";

export default function DashboardSummaryList({ user }: { user: User }) {
  const [summaries, setSummaries] = useState<UserSummaries[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSummaries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserOldSummaries(user.id);
      setSummaries(data || []);
    } catch {
      setSummaries([]);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  // Called when a new summary is added
  const handleSummaryAdded = (newSummary: UserSummaries) => {
    setSummaries((prev) => [newSummary, ...prev]);
  };

  // Remove a summary from the list by id
  const handleSummaryDeleted = (id: string) => {
    setSummaries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <UrlInput user={user} onSummaryAdded={handleSummaryAdded} />
      <div className="mt-10">
        {loading ? (
          <div className="text-center text-white py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.length > 0 ? (
              summaries.map((item) => (
                <OldSummaryCard key={item.id} summary={item} onDelete={handleSummaryDeleted} />
              ))
            ) : (
              <div className="text-center text-white py-12 w-full col-span-3">No summaries found.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
} 