"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import React from "react";
import { ExternalLink, MoreVertical, Trash2 } from "lucide-react";
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
    <CardSpotlight
      className="h-56 w-full flex flex-col justify-between relative cursor-pointer transition-shadow hover:shadow-2xl group"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View summary for ${summary.title}`}
    >
      {/* Three-dot menu */}
      <div className="absolute top-2 right-2 z-30 card-menu">
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={e => e.stopPropagation()}>
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={e => e.stopPropagation()}>
            <AlertDialog open={dialogOpen} onOpenChange={open => { setDialogOpen(open); setMenuOpen(open); }}>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={e => {
                    e.preventDefault();
                    setDialogOpen(true);
                    setMenuOpen(true);
                  }}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2 cursor-pointer" /> Delete
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
      <p className="text-xl font-bold relative z-20 mt-2 text-white dark:text-white truncate" title={summary.title || ''}>
        {summary.title}
      </p>
      <div className="text-neutral-200 dark:text-neutral-300 mt-2 relative z-20">
        <div className="flex items-center gap-1 w-full">
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
          <span
            className="truncate max-w-full block text-blue-400 dark:text-blue-300 hover:underline cursor-pointer"
            title={summary.url || ''}
            onClick={e => { e.stopPropagation(); window.open(summary.url, '_blank'); }}
            tabIndex={0}
            role="link"
          >
            {summary.url}
          </span>
        </div>
      </div>
      <p className="text-neutral-300 dark:text-neutral-400 mt-4 relative z-20 text-sm">
        Created At: <span className="font-medium">{new Date(summary.created_at).toLocaleDateString()}</span>
      </p>
    </CardSpotlight>
  );
}
