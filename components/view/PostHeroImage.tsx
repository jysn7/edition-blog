import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export function PostHeroImage({ post }: any) {
  return (
    <div className="aspect-21/11 rounded-xl overflow-hidden mb-20 bg-secondary relative border border-border">
      <Image
        src={urlFor(post.mainImage).url()}
        alt={post.title}
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
