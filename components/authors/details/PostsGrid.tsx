import { PostCard } from "./PostCard";

export function PostsGrid({ posts, authorName }: any) {
  if (!posts?.length) {
    return (
      <div className="py-32 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
          No entries for this profile.
        </p>
      </div>
    );
  }

  return (
    <section className="p-6 md:p-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {posts.map((post: any) => (
          <PostCard
            key={post._id}
            post={post}
            authorName={authorName}
          />
        ))}
      </div>
    </section>
  );
}
