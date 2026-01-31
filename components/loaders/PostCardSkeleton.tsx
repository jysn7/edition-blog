import { Skeleton } from "@/components/ui/skeleton";

export const PostCardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="aspect-square w-full rounded-lg bg-zinc-900" />
    
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-16 bg-zinc-900" />
        <Skeleton className="h-3 w-12 bg-zinc-900" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-7 w-full bg-zinc-900" />
        <Skeleton className="h-7 w-[80%] bg-zinc-900" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-zinc-900/50" />
        <Skeleton className="h-4 w-[90%] bg-zinc-900/50" />
      </div>
    </div>
  </div>
);