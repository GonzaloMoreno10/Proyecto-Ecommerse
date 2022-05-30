export default {
  get: {
    tags: ['Categories'],
    description: 'Lista las categorias',
    operationId: 'getCategory',
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
        name: 'CatName',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'Category Name',
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
