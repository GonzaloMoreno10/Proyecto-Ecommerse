export default {
  get: {
    tags: ['SubCategories'],
    description: 'SubCategories',
    operationId: 'getSubCategories',
    parameters: [
      {
        name: 'apikey',
        in: 'header',
        schema: {
          type: 'string',
        },
        default: '51515as1d5as1das1g51gjg6k13jh5mdf3g51dsf',
        description: 'Apikey from product service',
      },
      { name: 'TypName', in: 'query', description: 'Subcategory name' },
      { name: 'TypCatId', in: 'query', description: 'Category id' },
    ],
    responses: {
      200: {
        description: 'SubCategories',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ObjectSuccess',
            },
          },
        },
      },
      401: {
        escription: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
    },
  },
};
