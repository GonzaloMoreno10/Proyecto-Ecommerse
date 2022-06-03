export default {
  post: {
    tags: ['Authentication'],
    description: 'Ingresar al sistema',
    operationId: 'login',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              UsrEmail: {
                type: 'string',
                description: 'User email.',
                example: 'test1@example.com',
              },
              UsrPass: {
                type: 'string',
                description: 'User password.',
                example: 'Secret1*',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Loggin succeded',
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
