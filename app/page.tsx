import { sanityFetch } from '@/sanity/lib/live';
import BlogClient from './BlogClient';
import { postsQuery } from '@/sanity/lib/queries';

// 1. Force dynamic rendering so Next.js doesn't serve a stale HTML file
export const dynamic = 'force-dynamic';

export default async function Home() {
  // 2. Use 'published' perspective to ensure you see the latest live data
  const { data: posts } = await sanityFetch({ 
    query: postsQuery,
    perspective: 'published' 
  });

  return <BlogClient initialPosts={posts || []} />;
}