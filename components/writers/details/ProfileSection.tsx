import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PortableText } from "@portabletext/react";
import { CalendarDays, MapPin, Link as LinkIcon } from "lucide-react";

export function ProfileSection({ author }: { author: any }) {
  return (
    <section className="px-6 pb-12 relative flex flex-col items-center text-center">
      <div className="relative -mt-20 md:-mt-24 mb-6">
        <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full border-8 border-background overflow-hidden bg-secondary shadow-2xl">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover transition-all duration-700"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-black text-muted-foreground/20">
              {author.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div className="flex flex-col items-center gap-2">
          <Badge className="rounded-full px-4 py-1 text-xs font-regular tracking-[0.2em] bg-primary text-primary-foreground">
            {author.role}
          </Badge>

          <h1 className="text-3xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            {author.name}
          </h1>

          <p className="text-muted-foreground font-bold text-xs tracking-widest  opacity-60">
            @{author.slug}
          </p>
        </div>

        <div className="text-lg font-light leading-relaxed prose prose-neutral dark:prose-invert max-w-none mx-auto">
          {author.bio ? (
            <PortableText value={author.bio} />
          ) : (
            <p className="italic opacity-50">
              Editorial contributor at Edition System.
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs tracking-widest text-muted-foreground pt-4">
          {/* <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Remote Access</span>
          </div> */}

          {author.socialHandle && (
            <div className="flex items-center gap-2 text-primary hover:text-foreground transition-colors cursor-pointer">
              <LinkIcon className="h-4 w-4" />
              <span>{author.socialHandle}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Joined {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
