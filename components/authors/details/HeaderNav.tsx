import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function HeaderNav() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <Link
          href="/writers"
          className="hover:bg-secondary p-2 rounded-full transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">
            Writers
          </span>
        </Link>

        <div className="w-10" />
      </div>
    </nav>
  );
}
