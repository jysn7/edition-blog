import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PostCard({ post, authorName }: any) {
  return (
    <div className="group">
      <Link href={`/${post.slug}`} className="no-underline">
        <Card className="border-none bg-transparent hover:bg-secondary/40 transition-colors cursor-pointer rounded-xl">
          <CardContent className="p-4 flex gap-4">
            
            {/* Thumbnail */}
            <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-md bg-secondary border border-border/40">
              {post.mainImage ? (
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black opacity-10">
                  Edition
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-tight text-muted-foreground">
                  <span className="text-primary">
                    {new Date(post.publishedAt).getFullYear()}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="truncate">{authorName}</span>
                </div>            
                <h3 className="font-black text-sm md:text-base uppercase tracking-tight truncate group-hover:text-primary transition-colors">
                  {post.title}
                </h3>         
                <p className="text-muted-foreground text-xs line-clamp-1 font-medium">
                  {post.excerpt}
                </p>
              </div>      
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">
                  Read Entry
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-all" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Separator className="mx-4 bg-border/40" />
    </div>
  );
}
