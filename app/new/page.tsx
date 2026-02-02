"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createPost } from "../api/create/route";
import { client } from "@/sanity/lib/client";
import { categoriesQuery } from "@/sanity/lib/queries";

import CreatePostHeader from "@/components/create/CreatePostHeader";
import ImageUpload from "@/components/create/ImageUpload";
import PostMetaFields from "@/components/create/PostMetaFields";
import PostContentField from "@/components/create/PostContentField";
import FormFooter from "@/components/create/FormFooter";

export default function CreatePostPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await client.fetch(categoriesQuery);
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  if (!isLoaded) return null;
  if (!user) {
    router.push("/");
    return null;
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    const input = document.getElementById("image-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  async function handleSubmit(formData: FormData) {
    if (!user?.id) return;

    setLoading(true);
    try {
      const result = await createPost(formData, user.id);

      if (result.success) {
        toast.success("Entry Published", {
          description: "Your post and image have been indexed.",
        });
        router.push("/");
        router.refresh();
      } else {
        toast.error("Publication Failed", {
          description: result.error,
        });
      }
    } catch (err) {
      toast.error("System Error", {
        description: "An unexpected error occurred."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <CreatePostHeader user={user} />
      <form 
        action={handleSubmit} 
        encType="multipart/form-data" 
        className="space-y-10"
      >
        <ImageUpload
          preview={imagePreview}
          onChange={handleImageChange}
          onRemove={removeImage}
        />

        <Separator className="bg-border/40" />

        <PostMetaFields categories={categories} />

        <PostContentField />

        <FormFooter loading={loading} />
      </form>
    </main>
  );
}