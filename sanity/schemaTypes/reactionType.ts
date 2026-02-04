import { HeartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const reactionType = defineType({
  name: 'reaction',
  title: 'Blog Reaction',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'user',
      title: 'User ID',
      type: 'string',
      description: 'The Clerk User ID of the person who reacted',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      description: 'The blog post this reaction belongs to',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reaction',
      title: 'Reaction Type',
      type: 'string',
      options: {
        list: [
          { title: 'Heart (Love)', value: 'heart' },
          { title: 'Thumbs Up (Agree)', value: 'thumbsUp' },
          { title: 'Lightbulb (Insight)', value: 'insight' },
          { title: 'Rocket (Hype)', value: 'rocket' },
          { title: 'Eyes (Interesting)', value: 'eyes' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  
  preview: {
    select: {
      postTitle: 'post.title',
      userId: 'user',
      type: 'reaction',
    },
    prepare({ postTitle, userId, type }) {
      const emojis: Record<string, string> = {
        heart: '❤️',
        thumbsUp: '👍',
        insight: '💡',
        rocket: '🚀',
        eyes: '👀',
      }

      return {
        title: `${emojis[type] || '✨'} on ${postTitle || 'Deleted Post'}`,
        subtitle: `User: ${userId}`,
      }
    },
  },
})