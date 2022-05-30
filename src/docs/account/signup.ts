export default {
  post: {
    tags: ['Account'],
    description: 'Nueva cuenta',
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
              UsrName: {
                type: 'string',
                description: 'User name.',
                example: 'testUser',
              },
              UsrAddress: {
                type: 'string',
                description: 'User address.',
                example: 'address 123',
              },
              UsrBirthDate: {
                type: 'string',
                description: 'User birthdate.',
                example: '08/09/1995',
              },
              UsrPhone: {
                type: 'string',
                description: 'User phone.',
                example: '3548574528',
              },
              UsrDoc: {
                type: 'string',
                description: 'User doc.',
                example: '390255987',
              },
              UsrDocType: {
                type: 'string',
                description: 'User doc type.',
                example: '1',
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
        description: 'Account created',
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
