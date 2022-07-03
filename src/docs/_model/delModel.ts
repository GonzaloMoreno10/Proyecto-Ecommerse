export default {
  delete: {
    tags: ['Models'],
    description: 'Delete model',
    operationId: 'Delete model',
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
        name: 'ModId',
        in: 'path',
        required: true,
        description: 'Model Id',
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
