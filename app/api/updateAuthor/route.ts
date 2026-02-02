"use server";

import { adminClient } from "@/sanity/lib/adminClient";
import { revalidatePath } from "next/cache";

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