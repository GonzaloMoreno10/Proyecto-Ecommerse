export default {
  delete: {
    tags: ['SubCategories'],
    description: 'SubCategories',
    operationId: 'delSubCategoriesById',
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
        description: 'Ok',
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
