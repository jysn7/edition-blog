import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      description: 'The name of the topic (e.g., Architecture, Vision)',
      validation: (Rule) => Rule.required().min(2).max(20),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the URL and filtering',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'color',
        title: 'Brand Color',
        type: 'string',
        description: 'Hex code or CSS class for the editorial theme',
        initialValue: '#A3E635', // Default Lime
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
  ],
  // This makes the Sanity Studio list look much cleaner
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Category',
        subtitle: subtitle || 'No description provided',
        media: TagIcon,
      }
    },
  },
})