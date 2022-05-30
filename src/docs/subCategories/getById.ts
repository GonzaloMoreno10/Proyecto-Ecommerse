export default {
  get: {
    tags: ['SubCategories'],
    description: 'SubCategories',
    operationId: 'getSubCategoriesById',
    parameters: [
      {
        name: 'apikey',
        in: 'header',
        schema: {
          type: 'string',
        },
        description: 'Apikey from product service',
      },
      {
        name: 'TypId',
        in: 'path',
        schema: {
          type: 'number',
        },
        description: 'SubCategory id',
      },
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
