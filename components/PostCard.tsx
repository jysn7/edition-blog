import Link from "next/link";
import Image from "next/image";

export const PostCard = ({ post }: { post: any }) => {
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
    : "RECENT";

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="cursor-pointer">
        {/* Rectangular Image Container (3:2 Aspect Ratio) */}
        <div className="relative overflow-hidden rounded-xl mb-5 aspect-[3/2] bg-secondary/50 border border-border/40">
          {post.mainImage ? (
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[9px] text-muted-foreground/50 font-bold tracking-[0.4em]">
              NO MEDIA
            </div>
          )}
        </div>

        {/* Post Details */}
        <div className="space-y-3 px-1">
          <div className="flex justify-between items-center text-[9px] font-black tracking-[0.3em] text-muted-foreground uppercase">
            <div className="flex gap-3 items-center">
              <span className="text-foreground transition-colors group-hover:text-muted-foreground">
                {post.categories?.[0]?.title || "Editorial"}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="opacity-60">{formattedDate}</span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-[1.1] text-foreground transition-colors group-hover:text-muted-foreground">
            {post.title}
          </h3>

          {/* Excerpt - Always Visible */}
          <p className="text-muted-foreground/80 text-sm leading-relaxed line-clamp-2 font-medium italic">
            {post.excerpt}
          </p>

          <div className="pt-3 flex items-center gap-2.5">
            <div className="h-5 w-5 rounded-full overflow-hidden bg-secondary border border-border relative grayscale group-hover:grayscale-0 transition-all duration-500">
               {post.author?.image && (
                 <Image 
                   src={post.author.image} 
                   alt={post.author.name} 
                   fill 
                   className="object-cover"
                 />
               )}
            </div>
            <span className="text-[9px] font-black tracking-widest text-muted-foreground/40 uppercase group-hover:text-muted-foreground transition-colors">
              By {post.author?.name || "The Archive"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};