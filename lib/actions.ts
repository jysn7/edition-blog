"use server";

import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";

const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

function transformToPortableText(rawJson: string) {
  try {
    const blocks = JSON.parse(rawJson);
    return blocks.map((block: any) => {
      if (block.type === "image") {
        return {
          _type: "image",
          _key: block.id,
          assetUrl: block.props?.url,
        };
      }
      if (block.type === "heading") {
        return {
          _type: "block",
          _key: block.id,
          style: `h${block.props?.level || 1}`,
          children: (block.content || []).map((c: any) => ({
            _type: "span",
            _key: Math.random().toString(36).substring(7),
            text: c.text,
            marks: [
              c.styles?.bold && "strong",
              c.styles?.italic && "em",
              c.styles?.underline && "underline"
            ].filter(Boolean),
          })),
        };
      }
      if (block.type === "bulletListItem" || block.type === "numberedListItem") {
        return {
          _type: "block",
          _key: block.id,
          style: "normal",
          listItem: block.type === "bulletListItem" ? "bullet" : "number",
          level: 1,
          children: (block.content || []).map((c: any) => ({
            _type: "span",
            _key: Math.random().toString(36).substring(7),
            text: c.text,
            marks: [
              c.styles?.bold && "strong",
              c.styles?.italic && "em"
            ].filter(Boolean),
          })),
        };
      }
      return {
        _type: "block",
        _key: block.id,
        style: "normal",
        children: (block.content || []).map((c: any) => ({
          _type: "span",
          _key: Math.random().toString(36).substring(7),
          text: c.text,
          marks: [
            c.styles?.bold && "strong",
            c.styles?.italic && "em",
            c.styles?.underline && "underline"
          ].filter(Boolean),
        })),
        markDefs: [],
      };
    });
  } catch (e) {
    console.error("Content parsing error:", e);
    return [];
  }
}

export async function createPost(formData: FormData, userId: string) {
  const title = formData.get("title") as string;
  const rawContent = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const imageFile = formData.get("image") as File;
  const categoryId = formData.get("category") as string;

  if (!title || !rawContent) {
    return { error: "Title and Content are required." };
  }

  try {
    let mainImageAsset = null;

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      mainImageAsset = await adminClient.assets.upload('image', buffer, {
        filename: `main-${Date.now()}-${imageFile.name}`,
        contentType: imageFile.type,
      });
    }

    const bodyBlocks = transformToPortableText(rawContent);

    const result = await adminClient.create({
      _type: "post",
      title: title,
      slug: {
        _type: "slug",
        current: title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .slice(0, 96),
      },
      author: {
        _type: "reference",
        _ref: `author-${userId}`,
      },
      categories: categoryId ? [
        {
          _key: Math.random().toString(36).substring(7),
          _type: "reference",
          _ref: categoryId,
        }
      ] : [],
      mainImage: mainImageAsset ? {
        _type: 'image',
        asset: {
          _type: "reference",
          _ref: mainImageAsset._id
        }
      } : undefined,
      excerpt: excerpt || "New entry published to the archive.",
      publishedAt: new Date().toISOString(),
      body: bodyBlocks,
      likes: 0,
    });

    revalidatePath("/");
    return { success: true, id: result._id };
  } catch (err) {
    console.error("Sanity Write Error:", err);
    return { error: "Failed to publish post to Sanity." };
  }
}

export async function deletePost(postId: string) {
  try {
    await adminClient.delete(postId);
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Sanity Deletion Error:", err);
    return { error: "Could not remove the post from the database." };
  }
}

export async function updateAuthor(authorId: string, data: any) {
  try {
    const { name, socialHandle, bioText } = data;

    await adminClient
      .patch(authorId)
      .set({
        name: name,
        socialHandle: socialHandle,
        bio: [
          {
            _key: `bio-${Date.now()}`,
            _type: 'block',
            children: [
              {
                _key: `span-${Date.now()}`,
                _type: 'span',
                text: bioText,
              },
            ],
            style: 'normal',
          },
        ],
      })
      .commit();

    revalidatePath(`/`);
    return { success: true };
  } catch (error) {
    console.error("Sanity Update Error:", error);
    return { success: false };
  }
}
