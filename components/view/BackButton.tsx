import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase mb-12 hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back to Posts
    </Link>
  );
}
