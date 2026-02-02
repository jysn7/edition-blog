import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Globe } from "lucide-react";

export const FeedSidebar = ({ authors, recentPosts }: { authors: any[], recentPosts: any[] }) => {
  return (
    <aside className="hidden lg:block space-y-10 sticky top-32 h-fit w-full">
      
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase border-l-2 border-foreground pl-4">
            Contributors
          </h3>
          <span className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">
            {authors.length.toString().padStart(2, '0')}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          {authors.slice(0, 6).map((author) => (
            <div key={author._id} className="flex items-center gap-2 group cursor-pointer">
              <div className="h-7 w-7 shrink-0 rounded-full overflow-hidden bg-secondary relative ring-1 ring-border group-hover:ring-foreground transition-all">
                {author.image && (
                  <Image 
                    src={author.image} 
                    alt={author.name} 
                    fill 
                    className="object-cover transition-all duration-500" 
                  />
                )}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-foreground truncate group-hover:text-muted-foreground transition-colors">
                {author.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border/60" />

      {/* Recent Feed Section */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-1">
             <span className="text-[9px] font-bold text-primary tracking-[0.3em] uppercase">What's on peoples minds?</span>
             <h3 className="text-2xl font-black tracking-tighter text-foreground uppercase leading-none">
               Recent Feed
             </h3>
          </div>
          <Globe className="h-4 w-4 text-foreground animate-pulse" />
        </div>

        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link 
              href={`/${post.slug}`} 
              key={post._id} 
              className="group flex items-center gap-4 no-underline p-2 -mx-2 hover:bg-secondary/30 rounded-md transition-all"
            >
              {post.mainImage && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-secondary border border-border/40">
                   <Image 
                    src={post.mainImage} 
                    alt={post.title} 
                    fill 
                    className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
              )}
              
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <h4 className="text-[11px] font-bold leading-tight uppercase tracking-tight text-foreground group-hover:text-muted-foreground transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </div>

              <ArrowRight className="h-3 w-3 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
};