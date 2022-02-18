"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['Orders'],
        description: 'Crea una orden a partir del carrito.',
        operationId: 'createOrder',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/UserId',
                },
                required: true,
                description: 'User ID',
            },
        ],
        responses: {
            200: {
                description: 'Orden creada',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Order',
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
            500: {
                description: 'UserId invalido',
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
