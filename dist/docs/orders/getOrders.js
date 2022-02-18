"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Orders'],
        description: 'Lista todas las ordenes',
        operationId: 'getOrders',
        parameters: [],
        responses: {
            200: {
                description: 'Array de ordenes',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            description: 'Array de ordenes',
                            items: {
                                $ref: '#/components/schemas/Order',
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
        },
    },
};
