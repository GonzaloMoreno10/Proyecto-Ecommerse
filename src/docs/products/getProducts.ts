export default {
  get: {
    tags: ['Products'],
    description: 'Lista todos los productos',
    operationId: 'getProducts',
    parameters: [
      {
        name: 'nombre',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'Nombre del producto',
        example: 'Auricular RedRagon Zeus',
      },
      {
        name: 'codigo',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'Codigo del producto',
        example: '1235',
      },
      {
        name: 'minPrice',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Precio minimo',
        example: '100',
      },
      {
        name: 'maxPrice',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Precio maximo',
        example: '200',
      },
      {
        name: 'minStock',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Stock minimo',
        example: '20',
      },
      {
        name: 'maxStock',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Stock maximo',
        example: '30',
      },
    ],
    responses: {
      200: {
        description: 'Productos obtenidos',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array de productos',
              items: {
                $ref: '#/components/schemas/Product',
              },
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
        description: 'No hay productos cargados',
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
