"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PortableText } from "@portabletext/react";
import { CalendarDays, Link as LinkIcon, Settings2, X, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateAuthor } from "@/lib/actions";

export function ProfileSection({ author }: { author: any }) {
  const { userId } = useAuth();
  const isOwner = userId && author._id === `author-${userId}`;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState({
    name: author.name,
    socialHandle: author.socialHandle || "",
    bioText: author.bio?.[0]?.children?.[0]?.text || "",
  });

  const handleSave = async () => {
    setIsPending(true);
    const res = await updateAuthor(author._id, formData);
    if (res.success) {
      toast.success("Profile updated successfully.");
      setIsEditing(false);
    } else {
      toast.error("Failed to update profile.");
    }
    setIsPending(false);
  };

  return (
    <section className={`px-6 pb-12 relative flex flex-col items-center text-center transition-all duration-300 ${isEditing ? 'bg-secondary/5 pt-10' : ''}`}>
      
      {/* EDIT TOGGLE */}
      {isOwner && (
        <div className="absolute bottom-0 mx-auto md:top-4 md:right-6">
          <Button 
            variant="ghost" 
            onClick={() => setIsEditing(!isEditing)}
            className="text-[10px] font-bold border-2 border-border/60 uppercase tracking-widest gap-2 opacity-50 hover:opacity-100"
          >
            {isEditing ? <><X className="h-3 w-3" /> Cancel</> : <><Settings2 className="h-3 w-3" /> Edit Profile</>}
          </Button>
        </div>
      )}

      {/* AVATAR */}
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
            <div className="w-full h-full flex items-center justify-center text-2xl font-black text-muted-foreground/20">
              {author.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 max-w-3xl w-full">
        <div className="flex flex-col items-center gap-2">
          <Badge className="rounded-full px-4 py-1 text-xs font-regular tracking-[0.2em] bg-primary text-primary-foreground">
            {author.role}
          </Badge>

          {/* NAME FIELD */}
          {!isEditing ? (
            <h1 className="text-3xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              {author.name}
            </h1>
          ) : (
            <input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full max-w-2xl text-center bg-transparent border-b-2 border-primary focus:outline-none text-3xl md:text-7xl font-black tracking-tighter uppercase leading-none "
              placeholder="Name"
            />
          )}

          {/* SLUG: ALWAYS STATIC */}
          <p className="text-muted-foreground font-bold text-xs tracking-widest opacity-60">
            @{author.slug}
          </p>
        </div>

        {/* BIO FIELD */}
        <div className="text-lg font-light leading-relaxed prose prose-neutral dark:prose-invert max-w-none mx-auto">
          {!isEditing ? (
            author.bio ? <PortableText value={author.bio} /> : <p className="italic opacity-50">Contributor.</p>
          ) : (
            <textarea 
              value={formData.bioText}
              onChange={(e) => setFormData({...formData, bioText: e.target.value})}
              className="w-[90%] bg-background border-2 border-border/70 p-6 text-center italic font-light text-lg focus:ring-1 ring-primary outline-none min-h-[150px] rounded-md"
              placeholder="Edit bio..."
            />
          )}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs tracking-widest text-muted-foreground pt-4">
          
          {/* Social Handle Logic */}
          {(author.socialHandle || isEditing) && (
            <div className="flex items-center justify-center">
              {!isEditing ? (
                <div className="flex items-center gap-2 text-primary hover:text-foreground transition-colors cursor-pointer">
                  <LinkIcon className="h-4 w-4" />
                  <span>{author.socialHandle}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 border-b border-primary/30 pb-1">
                  <LinkIcon className="h-3 w-3 text-primary" />
                  <input 
                    value={formData.socialHandle}
                    onChange={(e) => setFormData({...formData, socialHandle: e.target.value})}
                    className="bg-transparent focus:outline-none text-[10px] font-bold uppercase tracking-widest text-primary text-center w-40"
                    placeholder="SOCIAL HANDLE/LINK"
                  />
                </div>
              )}
            </div>
          )}

          {/* Joined Date */}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Joined {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Save BUTTON */}
        {isEditing && (
          <div className="pt-10">
            <Button 
              disabled={isPending}
              onClick={handleSave}
              className="rounded-lg bg-primary text-primary-foreground uppercase font-black tracking-[0.2em] text-[10px] px-12 h-12 hover:scale-105 transition-all shadow-xl"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}