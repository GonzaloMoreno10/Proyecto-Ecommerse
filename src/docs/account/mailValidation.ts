export default {
  get: {
    tags: ['Account'],
    description: 'Validar cuenta',
    operationId: 'Mail validation',
    parameters: [
      {
        name: 'UsrId',
        in: 'path',
        required: true,
        description: 'User ID',
      },
      {
        name: 'hash',
        in: 'query',
        required: true,
        description: 'hash',
      },
    ],

    responses: {
      200: {
        description: 'Validation success',
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
