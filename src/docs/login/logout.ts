export default {
  get: {
    tags: ['Authentication'],
    description: 'Salir del sistema',
    operationId: 'logout',
    parameters: [],
    responses: {
      200: {
        description: 'Successful Logout.',
      },
    },
  },
};
