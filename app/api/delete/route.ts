"use server";

import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";

// Using the Admin Client for write permissions
const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

/**
 * DELETION ACTION:
 * Removes a document from Sanity and triggers a cache revalidation.
 * Returns a success/error status instead of redirecting.
 */
export async function deletePost(postId: string) {
  try {
    // Perform the deletion
    await adminClient.delete(postId);
    
    // Purge the cache so the post disappears from the home feed immediately
    revalidatePath("/");
    
    // Return a clean success status
    return { success: true };
  } catch (err) {
    console.error("Sanity Deletion Error:", err);
    return { error: "Could not remove the post from the database." };
  }
}