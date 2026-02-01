import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from 'next-sanity'

const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET')
    return new Response('Error: Missing webhook secret', { status: 500 })
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Error: Verification failed', { status: 400 })
  }

  const eventType = evt.type;

  // 1. HANDLE USER CREATION
  if (eventType === 'user.created') {
    const { id, first_name, last_name, image_url, email_addresses } = evt.data;
    const name = `${first_name || ""} ${last_name || ""}`.trim() || "New Writer";
    const slugValue = (email_addresses[0]?.email_address.split('@')[0] || id).toLowerCase();

    try {
      // Step A: Upload the Clerk image URL to Sanity as an asset
      let imageAsset = null;
      if (image_url) {
        const response = await fetch(image_url);
        const buffer = await response.arrayBuffer();
        imageAsset = await adminClient.assets.upload('image', Buffer.from(buffer), {
          filename: `avatar-${id}`,
        });
      }

      // Step B: Create the Author document with a proper image reference
      await adminClient.createIfNotExists({
        _type: 'author',
        _id: `author-${id}`,
        name: name,
        slug: { _type: 'slug', current: slugValue },
        role: 'Contributor',
        // Important: Formatting the image object to match Sanity's 'image' type
        image: imageAsset ? {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: imageAsset._id
          }
        } : undefined,
        bio: [
          {
            _key: 'initial',
            _type: 'block',
            children: [{ _type: 'span', text: 'New contributor archive.' }],
            style: 'normal',
          },
        ],
      });

      return new Response('User created in Sanity', { status: 201 })
    } catch (err) {
      console.error('Sanity Create Error:', err)
      return new Response('Error creating Sanity document', { status: 500 })
    }
  }

  // 2. HANDLE USER UPDATES
  if (eventType === 'user.updated') {
    const { id, first_name, last_name, image_url } = evt.data;
    const name = `${first_name || ""} ${last_name || ""}`.trim();

    try {
      let imageUpdate = {};
      
      // If image changed, upload the new one
      if (image_url) {
        const response = await fetch(image_url);
        const buffer = await response.arrayBuffer();
        const asset = await adminClient.assets.upload('image', Buffer.from(buffer));
        imageUpdate = {
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id }
          }
        };
      }

      await adminClient
        .patch(`author-${id}`)
        .set({
          name: name,
          ...imageUpdate
        })
        .commit();

      return new Response('User updated in Sanity', { status: 200 })
    } catch (err) {
      console.error('Sanity Update Error:', err)
      return new Response('Error updating Sanity document', { status: 500 })
    }
  }

  return new Response('Webhook received', { status: 200 })
}