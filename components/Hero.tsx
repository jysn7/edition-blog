"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export const Hero = ({ posts }: { posts: any[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="lg:col-span-8 relative group">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => (
            <div className="flex-[0_0_100%] min-w-0" key={post._id}>
              <Link href={`/${post.slug}`} className="block group/slide">
                <div className="relative aspect-video mb-8 overflow-hidden rounded-lg bg-secondary">
                  {post.mainImage && (
                    <Image
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-1000 group-hover/slide:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent opacity-60" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-foreground text-background rounded-md text-[10px] font-bold">
                      FEATURED
                    </Badge>
                    <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "RECENT"}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-7xl font-bold tracking-tighter hover:text-muted-foreground transition-colors leading-[0.9] text-foreground">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed font-light italic line-clamp-2">
                    {post.excerpt}
                  </p>

                  <Button variant="link" className="text-foreground p-0 h-auto gap-2 uppercase text-xs font-bold tracking-widest group-hover/slide:gap-4 transition-all">
                    READ STORY <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {posts.length > 1 && (
        <>
          <div className="absolute top-[30%] -left-4 -right-4 flex justify-between pointer-events-none z-20">
            <Button 
              onClick={() => emblaApi?.scrollPrev()} 
              variant="outline" 
              className="h-10 w-10 rounded-full bg-background/80 border-border pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </Button>
            <Button 
              onClick={() => emblaApi?.scrollNext()} 
              variant="outline" 
              className="h-10 w-10 rounded-full bg-background/80 border-border pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </Button>
          </div>

          <div className="flex gap-2 mt-8">
            {posts.map((_, index) => (
              <div
                key={index}
                className={`h-[2px] transition-all duration-500 rounded-full ${
                  index === selectedIndex ? "w-12 bg-foreground" : "w-4 bg-border"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};