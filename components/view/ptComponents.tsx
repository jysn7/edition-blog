import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const ptComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-20 mb-8 text-foreground leading-none">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-16 mb-6 tracking-tight text-foreground uppercase">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-12 mb-4 tracking-tight text-foreground uppercase">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light selection:bg-foreground selection:text-background">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-primary pl-6 italic my-10 text-xl text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-6 mb-8 space-y-3 text-muted-foreground text-lg font-light">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-6 mb-8 space-y-3 text-muted-foreground text-lg font-light">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
    number: ({ children }: any) => <li className="pl-2">{children}</li>,
  },
  marks: {
    underline: ({ children }: any) => (
      <span className="underline decoration-primary/50 underline-offset-4">
        {children}
      </span>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;

      return (
        <div className="my-12 overflow-hidden rounded-lg bg-secondary aspect-video relative">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Article imagery"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
};
