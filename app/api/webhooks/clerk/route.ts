import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from 'next-sanity'

// Dedicated admin client for backend write operations
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

  // Get the headers for Svix verification
  const headerPayload = await headers();
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

  // Verify the payload
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
      // createIfNotExists prevents 409 Conflict errors if Clerk retries the webhook
      await adminClient.createIfNotExists({
        _type: 'author',
        _id: `author-${id}`, 
        name: name,
        slug: { _type: 'slug', current: slugValue },
        image: image_url,
        role: 'Contributor',
        // Providing a basic block structure prevents Studio from crashing on empty content
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

  // 2. HANDLE USER UPDATES (Keep names/images in sync)
  if (eventType === 'user.updated') {
    const { id, first_name, last_name, image_url } = evt.data;
    const name = `${first_name || ""} ${last_name || ""}`.trim();

    try {
      await adminClient
        .patch(`author-${id}`)
        .set({
          name: name,
          image: image_url,
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