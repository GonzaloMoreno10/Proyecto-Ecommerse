export default {
  post: {
    tags: ['Brands'],
    description: 'Create a Brand',
    operationId: 'Brand created',
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
              BraName: {
                type: 'string',
                description: 'Brand name',
                example: 'Pets',
              },
              BraTypId: {
                type: 'number',
                description: 'Product Type ID',
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
