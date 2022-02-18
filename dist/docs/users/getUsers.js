"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['User'],
        description: 'Lista de usuarios',
        operationId: 'getUsers',
        parameters: [],
        responses: {
            200: {
                description: 'Usuarios obtenidos',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            description: 'Array de usuarios',
                            items: {
                                $ref: '#/components/schemas/User',
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
                description: 'No existen usuarios',
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
