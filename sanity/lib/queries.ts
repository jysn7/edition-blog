import { groq } from "next-sanity";

// Fragment for reusable posts
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
  },
  "reactionCounts": {
    "heart": count(*[_type == "reaction" && post._ref == ^._id && reaction == "heart"]),
    "thumbsUp": count(*[_type == "reaction" && post._ref == ^._id && reaction == "thumbsUp"]),
    "insight": count(*[_type == "reaction" && post._ref == ^._id && reaction == "insight"]),
    "rocket": count(*[_type == "reaction" && post._ref == ^._id && reaction == "rocket"]),
    "eyes": count(*[_type == "reaction" && post._ref == ^._id && reaction == "eyes"])
  },
  "userReaction": *[_type == "reaction" && post._ref == ^._id && user == $userId][0].reaction
`;

// Fragment for detailed author
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

// Fetch all posts for the feed (ordered by date)
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postFields}
  }
`;

// fetch only the Featured post for the Hero section
export const featuredPostQuery = groq`
  *[_type == "post" && featured == true][0] {
    ${postFields}
  }
`;

// Fetch single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;

// Fetch all categories (for the sidebar/filter and form selects)
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    color
  }
`;

// Fetvh all authors for the Writers Directory
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    ${authorFields}
  }
`;

// Fetch a single author by slug (for profile pages)
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