import { sanityFetch } from '@/sanity/lib/live';
import BlogClient from './BlogClient';
import { postsQuery } from '@/sanity/lib/queries';
import { auth } from "@clerk/nextjs/server"; // Import auth

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { userId } = await auth();

  const { data: posts } = await sanityFetch({ 
    query: postsQuery,
    params: { 
      userId: userId || null 
    },
    perspective: 'published' 
  });

  return <BlogClient initialPosts={posts || []} />;
}