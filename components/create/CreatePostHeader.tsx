import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

export default function CreatePostHeader({ user }: any) {
  return (
    <header className="mb-12 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-6 w-6 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
            <ArrowLeft className="h-3 w-3" />
          </div>
          <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">
            Go Back
          </span>
        </Link>

        <span className="text-xs flex items-center gap-2 font-semibold text-muted-foreground/50 ">
          <User className="h-3 w-3" />
          Author: {user?.firstName || "Contributor"}
        </span>
      </div>

      <h1 className="text-5xl font-black tracking-tighter uppercase leading-none text-foreground">
        New Entry<span className="text-primary">.</span>
      </h1>

      <p className="text-sm text-muted-foreground font-regular tracking-widest max-w-md">
        Contribute to the archive.
      </p>
    </header>
  );
}
