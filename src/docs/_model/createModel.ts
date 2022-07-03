export default {
  post: {
    tags: ['Models'],
    description: 'Create model',
    operationId: 'Model created',
    parameters: [
      {
        name: 'apikey',
        in: 'header',
        schema: {
          type: 'string',
        },
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
              ModName: {
                type: 'string',
                description: 'Brand name',
                example: 'Pets',
              },
              ModBraId: {
                type: 'number',
                description: 'Brand Id',
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
