"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Products'],
        description: 'Obtiene un producto en particular',
        operationId: 'getProduct',
        parameters: [
            {
                name: 'apikey',
                in: 'header',
                schema: {
                    type: 'string',
                },
                description: 'Apikey from product service',
            },
            {
                name: 'id',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/ProductId',
                },
                required: true,
                description: 'Product ID',
            },
        ],
        responses: {
            200: {
                description: 'Producto obtenido',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Product',
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
                description: 'El producto no existe',
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
