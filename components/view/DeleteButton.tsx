"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions";

export function DeletePostButton({ postId }: { postId: string }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsPending(true);
    
    try {
      const result = await deletePost(postId);

      if (result?.success) {
        toast.success("Entry successfully redacted", {
          description: "The record has been purged from the database.",
        });
        
        router.push("/");
        router.refresh();
      } else {
        toast.error("Operation failed", {
          description: result?.error || "Check server logs for details.",
        });
        setIsPending(false);
      }
    } catch (error) {
      toast.error("Protocol Error", {
        description: "The request was interrupted by the system.",
      });
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 rounded-md"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Remove Entry
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-[420px] border-border/50 bg-background/95 backdrop-blur-md p-8 shadow-2xl">
        <AlertDialogHeader className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <AlertDialogTitle className="text-2xl font-black tracking-tighter uppercase italic">
              Destructive Action
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed font-light">
              You are about to permanently delete this entry from the 
              <span className="text-foreground font-medium"> Edition </span> 
              archive. This operation is immediate and cannot be reversed.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-8 sm:justify-between gap-3">
          <AlertDialogCancel 
            disabled={isPending}
            className="flex-1 rounded-lg border-none hover:bg-secondary text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            Cancel
          </AlertDialogCancel>
          
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); 
              handleDelete();
            }}
            disabled={isPending}
            className="flex-1 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[10px] font-bold uppercase tracking-widest transition-all px-8"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Confirm Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}