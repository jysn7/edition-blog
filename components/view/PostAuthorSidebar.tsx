import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { DeletePostButton } from "@/components/view/DeleteButton";
import { PostActions } from "@/components/PostActions";

export function PostAuthorSidebar({ post, isOwner }: any) {
  return (
    <aside className="lg:col-span-3">
      <div className="sticky top-32 space-y-8">
        <div className="flex flex-col gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-secondary relative border border-border">
            {post.author?.image && (
              <Image
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div>
            <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1">
              Written By
            </p>
            <p className="text-sm font-bold text-foreground">
              {post.author?.name}
            </p>
            <p className="text-xs text-muted-foreground italic">
              {post.author?.role}
            </p>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-[10px] font-bold tracking-widest uppercase">
            5 Min Read
          </span>
        </div>
        
        <PostActions 
          slug={post.slug.current || post.slug} 
          postId={post._id}
          reactionData={{
            heartCount: post.reactionCounts?.heart || 0,
            thumbsUpCount: post.reactionCounts?.thumbsUp || 0,
            insightCount: post.reactionCounts?.insight || 0,
            rocketCount: post.reactionCounts?.rocket || 0,
            eyesCount: post.reactionCounts?.eyes || 0,
            userReaction: post.userReaction // This comes from the GROQ query
          }}
        />

        {isOwner && <DeletePostButton postId={post._id} />}

      </div>
    </aside>
  );
}
