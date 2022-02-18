"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Orders'],
        description: 'Obtiene una orden especifica',
        operationId: 'getOrder',
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/OrderId',
                },
                required: true,
                description: 'Order ID',
            },
        ],
        responses: {
            200: {
                description: 'Orden obtenida',
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
            404: {
                description: 'El usuario no existe',
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
