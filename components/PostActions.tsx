"use client";

import React, { useState } from "react";
import { Share2, Check, SmilePlus, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { toggleReaction } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PostActionsProps {
  slug: string;
  postId: string;
  reactionData: {
    heartCount: number;
    thumbsUpCount: number;
    insightCount: number;
    rocketCount: number;
    eyesCount: number;
    userReaction?: string; 
  };
}

const REACTIONS = [
  { label: "Love", value: "heart", emoji: "❤️" },
  { label: "Agree", value: "thumbsUp", emoji: "👍" },
  { label: "Insight", value: "insight", emoji: "💡" },
  { label: "Rocket", value: "rocket", emoji: "🚀" },
  { label: "Eyes", value: "eyes", emoji: "👀" },
];

export function PostActions({ slug, postId, reactionData }: PostActionsProps) {
  const { userId } = useAuth();
  const [copied, setCopied] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const totalReactions = 
    (reactionData.heartCount || 0) + 
    (reactionData.thumbsUpCount || 0) + 
    (reactionData.insightCount || 0) + 
    (reactionData.rocketCount || 0) + 
    (reactionData.eyesCount || 0);

  const handleReact = async (type: string) => {
    if (!userId) {
      setShowAuthDialog(true);
      return;
    }
    await toggleReaction(postId, userId, type);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeEmoji = REACTIONS.find((r) => r.value === reactionData.userReaction)?.emoji;

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="relative group/reaction">
          
          {/* POPUP PANEL */}
          <div className={cn(
            "absolute bottom-full left-0 mb-3 flex items-center gap-1 bg-background border-2 border-border/60 p-1.5 rounded-full shadow-2xl z-50",
            "invisible opacity-0 translate-y-2 scale-90 transition-all duration-200 ease-out",
            "group-hover/reaction:visible group-hover/reaction:opacity-100 group-hover/reaction:translate-y-0 group-hover/reaction:scale-100"
          )}>
            {REACTIONS.map((r, i) => (
              <button
                key={r.value}
                onClick={() => handleReact(r.value)}
                className={cn(
                  "p-2 text-xl leading-none rounded-full transition-all duration-200 hover:scale-150 hover:-translate-y-1 active:scale-90",
                  "opacity-0 cursor-pointer translate-y-4",
                  "group-hover/reaction:opacity-100 group-hover/reaction:translate-y-0",
                  reactionData.userReaction === r.value && "bg-secondary"
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
                title={r.label}
              >
                {r.emoji}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => !userId && setShowAuthDialog(true)}
            className={cn(
              "h-9 px-4 rounded-full border-2 border-border/50 transition-all duration-300 gap-2 hover:bg-secondary active:scale-95",
              reactionData.userReaction && "border-foreground/20 bg-secondary/50"
            )}
          >
            {activeEmoji ? (
              <span className="text-sm animate-in zoom-in duration-300">{activeEmoji}</span>
            ) : (
              <SmilePlus className="h-3.5 w-3.5 text-muted-foreground" />
            )}

            {totalReactions > 0 && (
              <span className={cn(
                "text-[10px] font-black tracking-widest tabular-nums",
                reactionData.userReaction ? "text-foreground" : "text-muted-foreground"
              )}>
                {totalReactions}
              </span>
            )}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="h-9 cursor-pointer px-4 rounded-full border-2 border-border/50 transition-all duration-300 gap-2 hover:bg-secondary active:scale-95"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
            {copied ? "Copied" : ""}
          </span>
        </Button>
      </div>

      {/* SHADCN AUTH DIALOG */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8">
          <DialogHeader className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center mb-2">
              <Lock className="h-6 w-6 text-foreground" />
            </div>
            <DialogTitle className="text-xl font-bold uppercase tracking-tighter italic">
              Join the Conversation
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Please sign in to react to stories and interact with the community.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-3 mt-4">
            <SignInButton mode="modal">
              <Button className="w-full h-12 rounded-full font-bold uppercase tracking-widest text-[10px]">
                Sign In to Edition
              </Button>
            </SignInButton>
            <Button 
              variant="ghost" 
              onClick={() => setShowAuthDialog(false)}
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}