"use client";
import React, { useState, useCallback } from "react";
import OldSummaryCard from "./OldSummaryCard";
import UrlInput from "./UrlInput";
import LoadingSpinner from "../common/LoadingSpinner";
import { getUserOldSummaries } from "@/actions/fetchActions";
import { User } from "@/lib/types";
import { UserSummaries } from "@/types";

export default function DashboardSummaryList({ 
  user, 
  initialSummaries = [] 
}: { 
  user: User;
  initialSummaries?: UserSummaries[];
}) {
  const [summaries, setSummaries] = useState<UserSummaries[]>(initialSummaries);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummaries = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      
      if (!user || !user.id) {
        console.error('DashboardSummaryList: Invalid user data');
        setError('Invalid user data. Please sign in again.');
        setSummaries([]);
        return;
      }
      
      const data = await getUserOldSummaries(user.id);
      setSummaries(data || []);
    } catch (err) {
      console.error('Error fetching summaries:', err);
      setError('Failed to load summaries. Please try again.');
      setSummaries([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleSummaryAdded = (newSummary: UserSummaries) => {
    setSummaries((prev) => [newSummary, ...prev]);
  };

  const handleSummaryDeleted = (id: string) => {
    setSummaries((prev) => prev.filter((item) => item.id !== id));
  };

  if (!user || !user.id) {
    return (
      <div className="container flex flex-col items-center justify-center mx-auto">
        <div className="mt-10 w-full">
          <div className="text-center text-red-400 py-12">
            <p className="text-xl mb-4">Invalid user data. Please sign in again.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container flex flex-col items-center justify-center mx-auto">
        <UrlInput user={user} onSummaryAdded={handleSummaryAdded} />
        <div className="mt-10 w-full">
          <LoadingSpinner message="Loading your summaries..." className="py-20" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex flex-col items-center justify-center mx-auto">
        <UrlInput user={user} onSummaryAdded={handleSummaryAdded} />
        <div className="mt-10 w-full">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center text-red-400 py-12">
              <p className="text-xl mb-4">{error}</p>
              <button
                onClick={fetchSummaries}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <UrlInput user={user} onSummaryAdded={handleSummaryAdded} />
      <div className="mt-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.length > 0 ? (
            summaries.map((item) => (
              <OldSummaryCard key={item.id} summary={item} onDelete={handleSummaryDeleted} />
            ))
          ) : (
            <div className="text-center text-white py-12 w-full col-span-3">
              <p className="text-xl mb-2">No summaries yet</p>
              <p className="text-gray-400">Start by pasting a YouTube URL above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 