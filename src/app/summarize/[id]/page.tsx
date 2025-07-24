import { getSummary } from "@/actions/fetchActions";
import SummaryBase from "@/components/summary/SummaryBase";
import { notFound } from "next/navigation";
import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Summarize({
  params,
}: PageProps) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id || typeof id !== 'string') {
      return notFound();
    }
    
    const summary = await getSummary(id);
    if (!summary) {
      return notFound();
    }
    
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
        <SummaryBase summary={summary} />
      </div>
    );
  } catch (error) {
    console.error('Summarize page error:', error);
    return notFound();
  }
} 