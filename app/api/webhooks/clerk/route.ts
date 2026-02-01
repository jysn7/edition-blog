import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from 'next-sanity'

// Use a dedicated admin client for writes to avoid configuration conflicts
const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, 
  token: process.env.SANITY_WRITE_TOKEN, // Ensure this is in your .env.local
})

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET')
    return new Response('Error: Missing webhook secret', { status: 500 })
  }

  // Get the headers
  const headerPayload = await headers(); // Await is required in Next.js 15/16
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 })
  }

  // Get the body
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

  if (eventType === 'user.created') {
    const { id, first_name, last_name, image_url, email_addresses } = evt.data;
    
    const name = `${first_name || ""} ${last_name || ""}`.trim() || "New Writer";
    const slugValue = email_addresses[0]?.email_address.split('@')[0] || id;

    try {
      await adminClient.create({
        _type: 'author',
        _id: `author-${id}`, 
        name: name,
        slug: { _type: 'slug', current: slugValue },
        image: image_url,
        role: 'Contributor',
        bio: [], 
      });
      
      return new Response('User synced to Sanity', { status: 201 })
    } catch (err) {
      console.error('Sanity Create Error:', err)
      return new Response('Error creating Sanity document', { status: 500 })
    }
  }

  return new Response('Webhook received', { status: 200 })
}