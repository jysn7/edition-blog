"use client";

import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

export default function ImageUpload({ preview, onChange, onRemove }: any) {
  const MAX_FILE_SIZE = 1 * 1024 * 1024;

  const handleFileValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File too large", { description: "Please upload an image smaller than 1MB." });
      e.target.value = "";
      return;
    }
    onChange(e);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <ImageIcon className="h-3 w-3 text-muted-foreground" />
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Feature Image
        </label>
      </div>

      <div className="relative w-full">
        {/* PREVIEW LAYER: Only shows when preview exists */}
        {preview && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-secondary/10 z-10">
            <NextImage src={preview} alt="Preview" fill className="object-cover" sizes="100vw" />
            <Button
              type="button"
              onClick={onRemove}
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4 h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* INPUT LAYER: Always exists in the DOM, but is visually hidden when preview is active */}
        <div className={`relative group ${preview ? "hidden" : "block"}`}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                  Upload Media
                </span>
              </div>
            </div>
          </div>

          <Input
            id="image-upload"
            name="image" // Sanity looks for this!
            type="file"
            accept="image/*"
            onChange={handleFileValidation}
            className="bg-secondary/20 border-2 border-dashed border-border/50 hover:border-foreground/50 rounded-lg h-32 text-transparent file:hidden cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}