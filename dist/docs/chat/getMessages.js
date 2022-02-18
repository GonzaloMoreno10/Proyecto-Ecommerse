"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Chat'],
        description: 'Lista todos los mensajes de un usuario',
        operationId: 'getMessages',
        parameters: [
            {
                name: 'userEmail',
                in: 'path',
                schema: {
                    type: 'string',
                    example: 'test1@example.com',
                },
                required: true,
                description: 'Email',
            },
        ],
        responses: {
            200: {
                description: 'Mensajes obtendiso',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            description: 'Array of chat messages.',
                            items: {
                                $ref: '#/components/schemas/Message',
                            },
                        },
                    },
                },
            },
            404: {
                description: 'No existe el usuario',
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
        },
    },
};
