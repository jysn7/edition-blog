import { groq } from "next-sanity";

// Fragment for reusable Post fields
const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featured,
  publishedAt,
  "mainImage": mainImage.asset->url,
  "author": author->{
    _id,
    name,
    role,
    socialHandle,
    "image": image.asset->url
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current,
    color
  }
`;

// Fragment for detailed Author fields
const authorFields = groq`
  _id,
  name,
  "slug": slug.current,
  "image": image.asset->url,
  role,
  bio,
  socialHandle,
  "postCount": count(*[_type == "post" && author._ref == ^._id])
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

// 3. Fetch a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;

// 4. Fetch all categories (for the sidebar/filter and form selects)
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    color
  }
`;

// 5. Fetch all authors for the Writers Directory
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    ${authorFields}
  }
`;

// 6. Fetch a single author by slug (for profile pages)
export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    ${authorFields},
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      ${postFields}
    }
  }
`;

export const relatedPostsQuery = `*[_type == "post" && references($categoryId) && _id != $postId][0...3] {
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->{name, image}
}`;