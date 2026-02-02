import { Button } from "@/components/ui/button";
import { Loader2, PenLine } from "lucide-react";

export default function FormFooter({ loading }: any) {
  return (
    <footer className="pt-6 flex items-center justify-between border-t border-border/40">
      <div className="hidden sm:block">
        <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
          Edition Content Engine v2.0
        </p>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="rounded-lg h-12 px-4 text-xs font-semibold tracking-[0.2em] bg-foreground text-background hover:bg-background hover:border-foreground border border-transparent cursor-pointer hover:text-foreground transition-all ml-auto"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            <PenLine size={8} />
            <span>Publish</span>
          </div>
        )}
      </Button>
    </footer>
  );
}
