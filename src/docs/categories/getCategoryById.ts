export default {
  get: {
    tags: ['Categories'],
    description: 'Categoria por id',
    operationId: 'getCategory by id',
    parameters: [
      {
        name: 'apikey',
        in: 'header',
        default: '51515as1d5as1das1g51gjg6k13jh5mdf3g51dsf',
        schema: {
          type: 'string',
        },
        description: 'Apikey from product service',
      },
      {
        name: 'CatId',
        in: 'path',
        required: true,
        description: 'Category Id',
      },
    ],
    responses: {
      200: {
        description: 'Categories',
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
