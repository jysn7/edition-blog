"use client";

import React, { useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PostCard } from '@/components/PostCard';
import { PostCardSkeleton } from '@/components/loaders/PostCardSkeleton';
import { PostFilters } from '@/components/PostFilters';
import { FeedSidebar } from '@/components/FeedSidebar';

export default function BlogClient({ initialPosts }: { initialPosts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter logic
  const filteredPosts = initialPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || 
      post.categories?.some((cat: any) => cat.slug === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Feed Logic
  const featuredPosts = initialPosts.filter(p => p.featured === true);
  const heroSlides = featuredPosts.length > 0 ? featuredPosts : [initialPosts[0]];
  const heroIds = new Set(heroSlides.map(p => p?._id));
  
  const gridPosts = (searchQuery || selectedCategory) 
    ? filteredPosts 
    : filteredPosts.filter(p => !heroIds.has(p._id));

  const recentPosts = [...initialPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 3);

  const authors = Array.from(
    new Map(initialPosts.filter(p => p.author).map(p => [p.author._id, p.author])).values()
  );

  const categories = Array.from(
    new Set(initialPosts.flatMap(post => post.categories || []).map((cat: any) => cat.slug))
  ).map(slug => {
    const category = initialPosts.flatMap(post => post.categories || []).find((cat: any) => cat.slug === slug);
    return { title: category.title, slug: category.slug };
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-6 py-12">
        
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {initialPosts.length > 0 ? <Hero posts={heroSlides} /> : <div className="lg:col-span-8 aspect-video bg-secondary animate-pulse rounded-lg" />}
          <Sidebar categories={categories} />
        </section>

        <Separator className="bg-border mb-12" />

        <PostFilters 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
                {gridPosts.map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-border rounded-lg uppercase text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
                No archive matches.
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <FeedSidebar authors={authors} recentPosts={recentPosts} />
        </div>
      </main>

      <footer className="border-t border-border mt-32 px-6 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 uppercase text-foreground">Edition.</h2>
        <div className="flex justify-center gap-8 text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
          {['Twitter', 'Are.na', 'Discord'].map(social => (
            <span key={social} className="hover:text-foreground cursor-pointer transition-colors">{social}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}