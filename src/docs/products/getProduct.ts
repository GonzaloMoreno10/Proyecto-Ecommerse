export default {
  get: {
    tags: ['Products'],
    description: 'Obtiene un producto en particular',
    operationId: 'getProduct',
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
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/ProductId',
        },
        required: true,
        description: 'Product ID',
      },
    ],
    responses: {
      200: {
        description: 'Producto obtenido',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      404: {
        description: 'El producto no existe',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
};
