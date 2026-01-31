import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Handle',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Portrait',
      type: 'image',
      options: {
        hotspot: true, // Crucial for that artistic cropping in your UI
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'role',
      title: 'Editorial Role',
      type: 'string',
      description: 'e.g., Senior Editor, Lead Designer, or Contributor',
      initialValue: 'Contributor',
    }),
    defineField({
      name: 'socialHandle',
      title: 'Social Handle',
      type: 'string',
      description: 'For the "Twitter" or "Are.na" links in your footer (e.g. @username)',
    }),
    defineField({
      name: 'bio',
      title: 'Full Biography',
      type: 'array',
      description: 'Longer bio for the author page.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle || 'Author',
        media,
      }
    },
  },
})