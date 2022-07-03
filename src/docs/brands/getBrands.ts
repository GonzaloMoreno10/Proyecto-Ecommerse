export default {
  get: {
    tags: ['Brands'],
    description: 'Lista las marcas',
    operationId: 'getBrands',
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
        name: 'BraName',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'Brand Name',
      },
      {
        name: 'BraTypId',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Product Type Id',
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
