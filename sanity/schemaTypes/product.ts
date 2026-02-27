export const productSchema = {
  name: 'product',
  title: 'Product Pricing',
  type: 'document',
  fields: [
    {
      name: 'modelName',
      title: 'Model Name (e.g., Hitman Smoker)',
      type: 'string',
    },
    {
      name: 'basePrice',
      title: 'Base Price ($)',
      type: 'number',
    },
    {
      name: 'options',
      title: 'Add-on Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Option Name', type: 'string' },
            { 
              name: 'requiresQuote', 
              title: 'Ask for Quote?', 
              type: 'boolean',
              description: 'Check this box if the price varies. It will display "Quote" instead of a dollar amount on the website.'
            },
            { 
              name: 'price', 
              title: 'Price ($)', 
              type: 'number',
              description: 'Leave at 0 if "Ask for Quote" is checked.'
            },
            { name: 'desc', title: 'Description (Optional)', type: 'text' },
            { 
              name: 'group', 
              title: 'Mutual Exclusion Group (Type any word!)', 
              type: 'string',
              description: 'Type a category name (e.g., "wheels", "grates", "paint"). If two or more options share the EXACT same word here, the customer can only choose ONE.'
            }
          ]
        }
      ]
    }
  ]
}