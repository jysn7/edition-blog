"use client";

import React, { useState, useMemo } from 'react'
import { Separator } from "@/components/ui/separator"
import { Sidebar } from '@/components/Sidebar';
import { Hero } from '@/components/Hero';
import { PostCard } from '@/components/PostCard';
import { PostFilters } from '@/components/PostFilters';
import { FeedSidebar } from '@/components/FeedSidebar';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogClient({ initialPosts }: { initialPosts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || 
        post.categories?.some((cat: any) => cat.slug === selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  const featuredPosts = initialPosts.filter(p => p.featured === true);
  const heroSlides = featuredPosts.length > 0 ? featuredPosts : [initialPosts[0]];
  const heroIds = new Set(heroSlides.map(p => p?._id));
  
  const allGridPosts = (searchQuery || selectedCategory) 
    ? filteredPosts 
    : filteredPosts.filter(p => !heroIds.has(p._id));

  const totalPages = Math.ceil(allGridPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentGridPosts = allGridPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

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
    return { title: category?.title, slug: category?.slug };
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      <main className="max-w-[1600px] mx-auto px-6 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8">
            <Hero posts={heroSlides} />
          </div>
          <Sidebar />
        </section>

        <Separator className="bg-border mb-12" />

        <PostFilters 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(val) => { setSelectedCategory(val); setCurrentPage(1); }}
          searchQuery={searchQuery}
          setSearchQuery={(val) => { setSearchQuery(val); setCurrentPage(1); }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {currentGridPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
                  {currentGridPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>

                {/* NUMERICAL PAGINATION CONTROLS */}
                {totalPages > 1 && (
                  <div className="mt-24 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full disabled:opacity-20 transition-all hover:bg-secondary"
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-1 px-2">
                        {pageNumbers.map((number) => (
                          <Button
                            key={number}
                            variant={currentPage === number ? "default" : "outline"}
                            className={`h-9 w-9 rounded-full text-[10px] font-bold transition-all border-none ${
                              currentPage === number 
                              ? "bg-foreground text-background hover:bg-foreground/90 scale-110 shadow-lg" 
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary bg-transparent"
                            }`}
                            onClick={() => handlePageChange(number)}
                          >
                            {number.toString().padStart(2, '0')}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full disabled:opacity-20 transition-all hover:bg-secondary"
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">
                      Page
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-border rounded-lg uppercase text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
                No matching records.
              </div>
            )}
          </div>

          <FeedSidebar authors={authors} recentPosts={recentPosts} />
        </div>
      </main>

      <footer className="border-t border-border mt-32 px-6 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 uppercase text-foreground">Edition.</h2>
      </footer>
    </div>
  )
}