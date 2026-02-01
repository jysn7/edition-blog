// app/writers/page.tsx
import { client } from "@/sanity/lib/client";
import { authorsQuery } from "@/sanity/lib/queries";
import WritersClient from "./WritersClient"; // We will create this next

export default async function Page() {
  // Fetch authors on the server
  const authors = await client.fetch(authorsQuery);

  // The wrapper passes the data into the client component
  return (
    <div className="bg-background min-h-screen">
      <WritersClient initialAuthors={authors || []} />
    </div>
  );
}