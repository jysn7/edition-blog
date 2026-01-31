import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export const Navbar = () => (
  <nav className="border-b border-border px-6 py-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-xl z-50">
    <div className="flex items-center gap-6">
      <Menu className="h-5 w-5 cursor-pointer hover:text-muted-foreground text-foreground transition-colors" />
      <h1 className="text-xl font-black uppercase tracking-tighter text-foreground">
        Edition<span className="text-muted-foreground">.01</span>
      </h1>
    </div>

    {/* Search Bar */}
    {/* <div className="hidden md:flex items-center bg-secondary/50 border border-border rounded-lg px-3 py-1 gap-3 w-80">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search archive..." 
        className="border-none  bg-secondary/50 focus-visible:ring-0 text-xs px-1 h-7 text-foreground placeholder:text-muted-foreground"
      />
    </div> */}

    {/* Actions Group */}
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-foreground">
        <span className="hidden lg:block cursor-pointer hover:text-muted-foreground transition-colors">Subscribe</span>
        <Button 
          variant="outline" 
          className="rounded-lg border-border h-9 px-4 text-[10px] uppercase font-bold tracking-widest hover:bg-secondary transition-colors"
        >
          Login
        </Button>
      </div>
      
      {/* Visual Separator */}
      <div className="h-4 w-px bg-border hidden sm:block" />
      
      <ModeToggle />
    </div>
  </nav>
);