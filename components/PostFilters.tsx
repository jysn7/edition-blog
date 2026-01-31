import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PostFiltersProps {
  categories: { title: string; slug: string }[];
  selectedCategory: string | null;
  setSelectedCategory: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const PostFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: PostFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap border",
            !selectedCategory 
              ? "bg-foreground text-background border-foreground" 
              : "border-border text-muted-foreground hover:border-foreground"
          )}
        >
          All Stories
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => setSelectedCategory(category.slug)}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap border",
              selectedCategory === category.slug
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground"
            )}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-80 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search archive..."
          className="pl-10 bg-secondary/30 border-border focus-visible:ring-1 focus-visible:ring-foreground text-xs font-regular tracking-[0.2em] h-8 rounded-lg placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
};