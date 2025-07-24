import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardSummaryList from "@/components/dashboard/DashboardSummaryList";

export default async function dashboard() {
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
  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <DashboardSummaryList user={session.user} />
    </div>
  );
}
