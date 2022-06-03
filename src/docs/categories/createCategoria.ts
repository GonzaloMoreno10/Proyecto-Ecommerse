export default {
  post: {
    tags: ['Categories'],
    description: 'Crea una categoria',
    operationId: 'categoryCreate',
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
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              CatName: {
                type: 'string',
                description: 'Category name',
                example: 'Pets',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Category created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ObjectSuccess',
            },
          },
        },
      },
      400: {
        escription: 'Validation error',
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
