export default {
  get: {
    tags: ['Models'],
    description: 'Models list',
    operationId: 'getModels',
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
        name: 'ModBraId',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'Brand Id',
      },
      {
        name: 'ModName',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Model Name',
      },
    ],
    responses: {
      200: {
        description: 'Categories',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Brands',
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
