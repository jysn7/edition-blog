import { sanityFetch } from '@/sanity/lib/live';
import BlogClient from './BlogClient';
import { postsQuery } from '@/sanity/lib/queries';


export default async function Home() {
  const { data: posts } = await sanityFetch({ query: postsQuery });

  return <BlogClient initialPosts={posts || []} />;
}