import { sanityFetch } from "@/sanity/lib/live";
import { postBySlugQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import { auth } from "@clerk/nextjs/server";

import { BackButton } from "@/components/view/BackButton";
import { PostHeader } from "@/components/view/PostHeader";
import { PostHeroImage } from "@/components/view/PostHeroImage";
import { PostAuthorSidebar } from "@/components/view/PostAuthorSidebar";
import { PostBody } from "@/components/view/PostBody";
import { RelatedPosts } from "@/components/view/RelatedPosts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Updated to Promise for Next.js 15 compatibility
}) {
  //  params and the auth
  const { slug } = await params;
  const { userId } = await auth();

  //  main post with explicitly unwrapped slug
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: {
      slug,
      userId: userId || null,
    },
  });

  if (!post) {
    return (
      <div className="text-foreground p-20 bg-background font-sans">
        Story not found.
      </div>
    );
  }

  // related posts
  const categoryId = post.categories?.[0]?._id || post.categories?.[0]?._ref;

  const { data: relatedPosts } = await sanityFetch({
    query: relatedPostsQuery,
    params: {
      slug, 
      categoryId,
      postId: post._id,
      userId: userId || null,
    },
  });

  const isOwner = userId && post.author?._id === `author-${userId}`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <article className="max-w-[900px] mx-auto px-6 py-20">
        <BackButton />
        <PostHeader post={post} />
        <PostHeroImage post={post} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <PostAuthorSidebar post={post} isOwner={isOwner} />
          <PostBody body={post.body} />
        </div>

        <RelatedPosts posts={relatedPosts} />
      </article>

      <footer className="border-t border-border mt-22 px-6 py-20 text-center">
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 text-foreground">
          Edition.
        </h2>
        <p className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
          End of Story
        </p>
      </footer>
    </div>
  );
}