"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import React from "react";
import { ExternalLink, MoreVertical, Trash2, User, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UserSummaries } from "@/types";

// Helper function to format view count
const formatViewCount = (count?: number | null): string => {
  if (!count || count === 0) return "0 views";
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  } else {
    return `${count} views`;
  }
};

export default function OldSummaryCard({
  summary,
  onDelete,
}: {
  summary: UserSummaries;
  onDelete?: (id: string) => void;
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Early return if summary is invalid
  if (!summary || !summary.id) {
    console.error('OldSummaryCard: Invalid summary data provided');
    return null;
  }

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/delete-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: summary.id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete summary");
      }
      if (onDelete) onDelete(summary.id);
      toast.success("Summary deleted successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to delete summary");
      }
    } finally {
      setLoading(false);
      setDialogOpen(false);
      setMenuOpen(false);
    }
  };

  // Make the card clickable except for the menu
  const handleCardClick = () => {
    if (menuOpen) return;
    router.push(`/summarize/${summary.id}`);
  };

  return (
    <CardSpotlight onClick={handleCardClick} className="h-[320px] w-full cursor-pointer hover:scale-105 transition-transform duration-200">
      {/* Menu Button */}
      <div className="absolute top-4 right-4 z-30">
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
            >
              <MoreVertical className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={e => e.stopPropagation()}>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setDialogOpen(true); }} className="text-red-600 cursor-pointer">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={e => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this summary?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Are you sure you want to delete this summary?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={loading} onClick={e => { e.stopPropagation(); setMenuOpen(false); }}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600" disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Card content */}
      <div className="p-4 h-full flex flex-col rounded-3xl">
        {/* Title */}
        <h3 className="text-xl font-bold relative z-20 mb-3 text-white line-clamp-2 leading-tight" title={summary.title || 'Untitled'}>
          {summary.title || ''}
        </h3>
        
        {/* Author and View Count */}
        <div className="text-neutral-200 mb-4 relative z-20 space-y-2">
          {summary.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-300 truncate" title={summary.author}>
                {summary.author}
              </span>
            </div>
          )}
          
          {summary.view_count !== null && summary.view_count !== undefined && (
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-300">
                {formatViewCount(summary.view_count)}
              </span>
            </div>
          )}
        </div>
        
        {/* URL */}
        <div className="text-neutral-200 mb-4 relative z-20 flex-1">
          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400" />
            <span
              className="text-sm text-blue-400 hover:underline cursor-pointer line-clamp-2 leading-relaxed"
              title={summary.url || 'No URL'}
              onClick={e => { e.stopPropagation(); if (summary.url) window.open(summary.url, '_blank'); }}
              tabIndex={0}
              role="link"
            >
              {summary.url || 'No URL'}
            </span>
          </div>
        </div>
        
        {/* Created At */}
        <div className="text-neutral-400 relative z-20 text-sm mt-auto">
          Created: <span className="font-medium">
            {summary.created_at ? new Date(summary.created_at).toLocaleDateString() : 'Unknown date'}
          </span>
        </div>
      </div>
    </CardSpotlight>
  );
}
