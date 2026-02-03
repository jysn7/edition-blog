import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export function RelatedPosts({ posts }: any) {
  if (!posts?.length) return null;

  return (
    <section className="mt-32 pt-16 border-t border-border">
      <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground mb-12">
        Further Reading
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((rel: any) => (
          <Link
            key={rel.slug}
            href={`/posts/${rel.slug}`}
            className="group block space-y-4"
          >
            <div className="aspect-[16/10] relative overflow-hidden rounded-lg border border-border/40 bg-secondary">
              {rel.mainImage && (
                <Image
                  src={urlFor(rel.mainImage).url()}
                  alt={rel.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold leading-tight group-hover:text-muted-foreground transition-colors line-clamp-2">
                {rel.title}
              </h3>
              <p className="text-xs text-muted-foreground/80 line-clamp-2 italic font-medium">
                {rel.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
