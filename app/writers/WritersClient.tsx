"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function WritersClient({ initialAuthors = [] }: { initialAuthors: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredAuthors = initialAuthors.filter((author) =>
    author.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredAuthors.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstItem, indexOfLastItem);

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Contributors
            </span>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground/50 tabular-nums">
            {filteredAuthors.length}/{initialAuthors.length} INDEXED
          </span>
        </div>

        <h1 className="text-5xl font-black tracking-tighter uppercase leading-none text-foreground">
          Writers<span className="text-primary">.</span>
        </h1>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <Input 
            placeholder="Search archive..."
            className="pl-10 bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-foreground rounded-full h-12 text-sm font-medium tracking-tight transition-all"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </header>

      {/* List */}
      <div className="space-y-1">
        {currentAuthors.length > 0 ? (
          currentAuthors.map((author) => (
            <div key={author._id} className="group">
              {/* Outer Link handles the entire card navigation */}
              <Link href={`/writers/${author.slug}`} className="no-underline">
                <Card className="border-none bg-transparent hover:bg-secondary/40 transition-colors cursor-pointer rounded-xl">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-border/50 group-hover:border-foreground transition-colors">
                        <AvatarImage src={author.image} alt={author.name} className="object-cover" />
                        <AvatarFallback className="font-black text-xs uppercase bg-secondary">
                          {author.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-sm tracking-tight uppercase truncate">
                            {author.name}
                          </span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary fill-primary/10" />
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium uppercase tracking-tighter">
                          <span>{author.role || "Staff"}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span className="font-bold text-foreground/70">{author.postCount} Posts</span>
                        </div>
                      </div>
                    </div>

                    {/* Button is now a child of the main Link - no internal Link here to prevent <a> in <a> */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full h-8 px-4 text-[10px] font-black uppercase tracking-widest hidden sm:flex group-hover:bg-foreground group-hover:text-background transition-all"
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              </Link>
              <Separator className="mx-4 bg-border/40" />
            </div>
          ))
        ) : (
          <div className="text-center py-20 border border-dashed rounded-2xl">
             <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
               No archive matches found.
             </p>
          </div>
        )}
      </div>

      {/* Numerical Pagination Controls */}
      {totalPages > 0 && (
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full disabled:opacity-20"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1 px-2">
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  className={`h-9 w-9 rounded-full text-[10px] font-bold transition-all ${
                    currentPage === number 
                    ? "bg-foreground text-background hover:bg-foreground/90" 
                    : "border-border/50 hover:bg-secondary"
                  }`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number.toString().padStart(2, '0')}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full disabled:opacity-20"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}