export default {
  delete: {
    tags: ['Categories'],
    description: 'Delete category',
    operationId: 'deleteCategory',
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
