export default {
  put: {
    tags: ['Products'],
    description: 'Actualizar un producto',
    operationId: 'updateProduct',
    parameters: [
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
    requestBody: {
      required: 'true',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductInputEdit',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Producto actualizado correctamente',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      400: {
        description: 'Invalid body',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
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
