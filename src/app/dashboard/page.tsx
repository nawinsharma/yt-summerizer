import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardSummaryList from "@/components/dashboard/DashboardSummaryList";
import { getUserOldSummaries } from "@/actions/fetchActions";
import UserInitializer from "@/components/dashboard/UserInitializer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard - YouTube Summarizer',
  description: 'View and manage your YouTube video summaries',
};

export default async function dashboard() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session || !session.user || !session.user.id) {
      return (
        <div className="container text-center py-12">
          <p className="text-xl text-red-500">User session not found. Please sign in again.</p>
        </div>
      );
    }
    
    // Additional null check for user object
    const user = session.user;
    if (!user || !user.id) {
      return (
        <div className="container text-center py-12">
          <p className="text-xl text-red-500">Invalid user data. Please sign in again.</p>
        </div>
      );
    }

    // Fetch summaries on the server
    const summaries = await getUserOldSummaries(user.id);
    
    return (
      <>
        <UserInitializer user={user} />
        <div className="container flex flex-col items-center justify-center mx-auto">
          <DashboardSummaryList user={user} initialSummaries={summaries} />
        </div>
      </>
    );
  } catch (error) {
    console.error('Dashboard page error:', error);
    return (
      <div className="container text-center py-12">
        <p className="text-xl text-red-500">An error occurred while loading the dashboard. Please try again.</p>
      </div>
    );
  }
}
