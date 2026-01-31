import { Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const Sidebar = ({ categories }: { categories?: any[] }) => {
  const displayCategories = categories?.length 
    ? categories 
    : [
        { title: 'Design', slug: 'design' },
        { title: 'Interviews', slug: 'interviews' },
        { title: 'Technique', slug: 'technique' },
        { title: 'Archive', slug: 'archive' }
      ];

  return (
    <aside className="lg:col-span-4 space-y-12">
      <div className="border-t border-border pt-8">
        <h3 className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground mb-8 uppercase">
          Categories
        </h3>
        <ul className="space-y-4 text-2xl font-medium tracking-tight">
          {displayCategories.map((category) => (
            <li key={category.slug}>
              <Link 
                href={`/category/${category.slug}`}
                className="flex justify-between items-center group cursor-pointer hover:text-muted-foreground transition-colors text-foreground"
              >
                {category.title} 
                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-secondary rounded-lg p-8">
        <Globe className="h-8 w-8 mb-4 text-muted-foreground" />
        <h4 className="text-lg font-bold mb-2 tracking-tight text-foreground">
          Global Network
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Join 50k+ readers receiving weekly curated insights into the future of creativity.
        </p>
      </div>
    </aside>
  );
};