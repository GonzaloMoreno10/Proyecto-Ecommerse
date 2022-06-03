export default {
  get: {
    tags: ['Authentication'],
    description: 'Salir del sistema',
    operationId: 'logout',
    parameters: [],
    responses: {
      200: {
        description: 'Logout success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ObjectSuccess',
            },
          },
        },
      },
      400: {
        escription: 'Validation error',
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
