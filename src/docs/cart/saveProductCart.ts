export default {
  post: {
    tags: ['Cart'],
    description: 'Agregar un producto al carrito',
    operationId: 'saveProductCart',
    parameters: [
      {
        name: 'idProducto',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/ProductId',
        },
        required: true,
        description: 'Product ID',
      },
      {
        name: 'userId',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/Userid',
        },
        required: true,
        description: 'User ID',
      },
    ],
    responses: {
      201: {
        description: 'Producto agregado al carrito',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProductCart',
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
        description: 'El carrito no existe o el producto ya se encuentra en el carrito o el producto no existe',
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
