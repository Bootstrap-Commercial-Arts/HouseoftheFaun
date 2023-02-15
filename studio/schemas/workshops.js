export default {
    name: 'workshop',
    title: 'Workshop',
    type: 'document',
    fields: [
        {
          name: 'name',
          title: 'Workshop Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'teacher',
          title: 'Teacher',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'ticketLink',
          title: 'Ticket Link',
          type: 'url',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          validation: Rule => Rule.required()
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
          validation: Rule => Rule.required().precision(2).error('Please enter a number with less than two decimal places')
        },
        {
          name: 'when',
          title: 'Time & Date',
          type: 'datetime',
          options: { format: 'h:mm a, MMM D' },
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