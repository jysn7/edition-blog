"use client";

import React, { useState, useEffect } from "react";
import { Heart, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PostActionsProps {
  slug: string;
}

export function PostActions({ slug,  }: PostActionsProps) {


  // --- Share Logic ---
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      {/* LIKE BUTTON */}
      {/* <Button
        variant="ghost"
        size="sm"
        onClick={handleLikeToggle}
        className={cn(
          "h-9 px-4 rounded-full border border-border/40 transition-all duration-300 gap-2 hover:bg-secondary",
          isLiked && "border-red-400/20 bg-red-400/[0.03] hover:bg-red-500/[0.06]"
        )}
      >
        <Heart
          className={cn(
            "h-3.5 w-3.5 transition-all duration-300",
            isLiked ? "fill-red-400 text-red-400 scale-110" : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        <span className={cn(
          "text-[10px] font-black tracking-[0.2em] tabular-nums",
          isLiked ? "text-red-400" : "text-muted-foreground"
        )}>
          {likes}
        </span>
      </Button> */}

      {/* SHARE BUTTON */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="h-9 cursor-pointer px-4 rounded-full border-2 border-border/50 transition-all duration-300 gap-2 hover:bg-secondary"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-violet-400" />
        ) : (
          <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
        )}
        <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
          {copied ? "Link Copied" : "Share"}
        </span>
      </Button>
    </div>
  );
}