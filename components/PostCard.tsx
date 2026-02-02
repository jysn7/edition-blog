import Link from "next/link";
import Image from "next/image";

export const PostCard = ({ post }: { post: any }) => {
  // date formatd
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase()
    : "RECENT";

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="cursor-pointer">
        <div className="relative overflow-hidden rounded-lg mb-6 aspect-square bg-secondary">
          {post.mainImage ? (
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground tracking-[0.3em]">
              NO MEDIA
            </div>
          )}
        </div>

        {/* post details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            <div className="flex gap-2 items-center">
              <span className="text-foreground/80">{post.categories?.[0]?.title || "Article"}</span>
              <span className="text-border">/</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold tracking-tight group-hover:text-muted-foreground transition-colors leading-tight text-foreground">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 font-light italic">
            {post.excerpt}
          </p>

          {/* authorr details*/}
          <div className="pt-2 flex items-center gap-2">
            <div className="h-4 w-4 rounded-full overflow-hidden bg-secondary relative">
               {post.author?.image && (
                 <Image 
                   src={post.author.image} 
                   alt={post.author.name} 
                   fill 
                   className="object-cover opacity-80"
                 />
               )}
            </div>
            <span className="text-[9px] font-bold tracking-widest text-muted-foreground/60 uppercase">
              By {post.author?.name || "Editorial Staff"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};