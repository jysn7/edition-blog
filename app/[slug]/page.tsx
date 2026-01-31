import { sanityFetch } from "@/sanity/lib/live";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { Navbar } from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const ptComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-16 mb-6 tracking-tight text-foreground">{children}</h2>
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
    underline: ({ children }: any) => <span className="underline decoration-primary/50 underline-offset-4">{children}</span>,
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

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await sanityFetch({ 
    query: postBySlugQuery, 
    params 
  });

  if (!post) return <div className="text-foreground p-20 bg-background font-sans">Story not found.</div>;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <article className="max-w-[900px] mx-auto px-6 py-20">
        {/* BACK BUTTON */}
        <Link href="/" className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase mb-12 hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Edition
        </Link>

        {/* HEADER SECTION */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <span className="text-[10px] font-bold text-foreground tracking-[0.2em] uppercase">
               {post.categories?.[0]?.title || "Article"}
             </span>
             <Separator orientation="vertical" className="h-3 bg-border" />
             <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
               {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
             </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-10 text-foreground">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl italic border-l-2 border-border pl-6">
            {post.excerpt}
          </p>
        </header>

        {/* HERO IMAGE */}
        <div className="aspect-[21/9] rounded-xl overflow-hidden mb-20 bg-secondary relative border border-border">
          <Image 
            src={post.mainImage} 
            alt={post.title} 
            fill 
            priority
            className="object-cover" 
          />
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* AUTHOR SIDEBAR */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-8">
              <div className="flex flex-col gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-secondary relative border border-border">
                  {post.author?.image && (
                    <Image 
                        src={post.author.image} 
                        alt={post.author.name} 
                        fill 
                        className="object-cover" 
                    />
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1">Written By</p>
                  <p className="text-sm font-bold text-foreground">{post.author?.name}</p>
                  <p className="text-xs text-muted-foreground italic">{post.author?.role}</p>
                </div>
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-[10px] font-bold tracking-widest uppercase">8 Min Read</span>
              </div>
            </div>
          </aside>

          {/* MAIN BODY */}
          <section className="lg:col-span-9 max-w-2xl prose prose-zinc dark:prose-invert">
            <PortableText value={post.body} components={ptComponents} />
          </section>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="border-t border-border mt-32 px-6 py-20 text-center">
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 text-foreground">Edition.</h2>
        <p className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">End of Story</p>
      </footer>
    </div>
  );
}