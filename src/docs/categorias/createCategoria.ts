export default {
  post: {
    tags: ['Categoria'],
    description: 'Crea una categoria',
    operationId: 'categoryCreate',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                description: 'Category name',
                example: 'Mascotas',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Categoria creada',
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
    },
  },
};
