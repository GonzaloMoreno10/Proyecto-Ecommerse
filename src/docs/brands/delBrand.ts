export default {
  delete: {
    tags: ['Brands'],
    description: 'Delete brand',
    operationId: 'Delete brand',
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
        name: 'BraId',
        in: 'path',
        required: true,
        description: 'Brand Id',
      },
    ],
    responses: {
      200: {
        description: 'Brands',
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
