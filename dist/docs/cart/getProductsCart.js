"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Cart'],
        description: 'Lista todos los productos del carrito',
        operationId: 'getProductsCart',
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
                description: 'Productos obtenidos',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            description: 'Array de productos del carrito',
                            items: {
                                $ref: '#/components/schemas/ProductCart',
                            },
                        },
                    },
                },
            },
            404: {
                description: 'El carrito o el usuario no existe',
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
