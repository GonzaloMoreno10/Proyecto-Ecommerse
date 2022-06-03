export default {
  delete: {
    tags: ['Products'],
    description: 'Eliminar un producto',
    operationId: 'deleteProduct',
    parameters: [
      {
        name: 'apikey',
        in: 'header',
        default: '51515as1d5as1das1g51gjg6k13jh5mdf3g51dsf',
        schema: {
          type: 'string',
        },
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
        description: 'Producto eliminado correctamente',
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
