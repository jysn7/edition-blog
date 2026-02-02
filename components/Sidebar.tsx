"use client";

import { Globe, ArrowUpRight, Activity } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="lg:col-span-4 space-y-12">
      {/* Editorial Manifesto Section */}
      <div className="border-t border-border pt-8">
        <h3 className="text-[10px] font-black tracking-[0.4em] text-muted-foreground mb-8 uppercase">
          Manifesto
        </h3>
        <div className="space-y-6">
          <h2 className="text-4xl font-black tracking-tighter leading-[0.9] uppercase text-foreground">
            The Modern <br /> Artifact.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed italic font-light max-w-sm">
            Exploring the ghosts within the machine and the tactile permanence of the analog world. 
            Volume 01 documents the intersection of human experience and digital evolution.
          </p>
          {/* <Link 
            href="/about"
            className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-foreground group cursor-pointer pt-2"
          >
            Read the full thesis 
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link> */}
        </div>
      </div>

      {/* Global Network / Newsletter Section */}
      <div className="bg-secondary rounded-lg p-8 border border-border/50">
        <div className="flex justify-between items-start mb-6">
          <Globe className="h-8 w-8 text-foreground animate-pulse" />
          {/* <div className="flex items-center gap-2 px-2 py-1 rounded bg-background/50 border border-border">
            <Activity className="h-3 w-3 text-emerald-500" />
            <span className="text-[8px] font-black uppercase tracking-tighter">Live System</span>
          </div> */}
        </div>
        
        <h4 className="text-lg font-bold mb-2 tracking-tight text-foreground uppercase">
          Global Network
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed uppercase tracking-wide mb-6">
          Join 50+ readers receiving weekly curated insights into the future of creative technology.
        </p>

        {/* <form className="flex gap-2 border-b border-border pb-2 focus-within:border-foreground transition-colors">
          <input 
            type="email"
            placeholder="EMAIL ADDRESS" 
            className="bg-transparent text-[10px] flex-1 outline-none uppercase font-bold placeholder:text-muted-foreground/50" 
          />
          <button type="submit" className="text-[10px] font-black uppercase tracking-widest hover:text-muted-foreground transition-colors">
            Join
          </button>
        </form> */}
      </div>
    </aside>
  );
};