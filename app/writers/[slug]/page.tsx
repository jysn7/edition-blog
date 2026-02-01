import { client } from "@/sanity/lib/client";
import { authorBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

import { HeaderNav } from "@/components/writers/details/HeaderNav";
import { ProfileBanner } from "@/components/writers/details/ProfileBanner";
import { ProfileSection } from "@/components/writers/details/ProfileSection";
import { PostsTabBar } from "@/components/writers/details/PostsTabBar";
import { PostsGrid } from "@/components/writers/details/PostsGrid";

export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await client.fetch(authorBySlugQuery, { slug });

  if (!author) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      <HeaderNav />

      <main className="max-w-[1600px] mx-auto border-x border-border min-h-screen">
        <ProfileBanner />
        <ProfileSection author={author} />
        {/* <PostsTabBar /> */}
        <PostsGrid posts={author.posts} authorName={author.name} />
      </main>
    </div>
  );
}
