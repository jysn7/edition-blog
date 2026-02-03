import { Separator } from "@/components/ui/separator";

export function PostHeader({ post }: any) {
  return (
    <header className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[10px] font-bold text-foreground tracking-[0.2em] uppercase">
          {post.categories?.[0]?.title || "Article"}
        </span>

        <Separator orientation="vertical" className="h-3 bg-border" />

        <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-10 text-foreground">
        {post.title}
      </h1>

      <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl italic border-l-2 border-border pl-6">
        {post.excerpt}
      </p>
    </header>
  );
}
