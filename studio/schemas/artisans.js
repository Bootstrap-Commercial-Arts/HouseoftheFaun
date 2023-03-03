export default {
    name: 'artisan',
    title: 'Artisan',
    type: 'document',
    fields: [
        {
          name: 'name',
          title: 'Artisan Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'shopLink',
          title: 'Shop Link',
          type: 'url'
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: Rule => Rule.required()
        },
      ]
  }