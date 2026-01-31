import { groq } from "next-sanity";

// Fragment for reusable Post fields to keep code DRY
const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featured,
  publishedAt,
  "mainImage": mainImage.asset->url,
  "author": author->{
    name,
    role,
    socialHandle,
    "image": image.asset->url
  },
  "categories": categories[]->{
    title,
    "slug": slug.current,
    color
  }
`;

// 1. Fetch all posts for the feed (ordered by date)
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`;

// 2. Fetch only the Featured post for the Hero section
export const featuredPostQuery = groq`
  *[_type == "post" && featured == true][0] {
    ${postFields}
  }
`;

// 3. Fetch a single post by slug (for the individual post page)
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;

// 4. Fetch all categories (for the sidebar/filter)
export const categoriesQuery = groq`
  *[_type == "category"] {
    title,
    "slug": slug.current,
    color
  }
`;