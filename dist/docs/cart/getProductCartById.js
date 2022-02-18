"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Cart'],
        description: 'Retorna el producto en especifico del carrito',
        operationId: 'getProductById',
        parameters: [
            {
                name: 'idProducto',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/ProductId',
                },
                required: true,
                description: 'Product ID',
            },
            {
                name: 'userId',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/Userid',
                },
                required: true,
                description: 'User ID',
            },
        ],
        responses: {
            201: {
                description: 'Producto agregado al carrito',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ProductCart',
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
                description: 'El carrito o el producto no esta en el carrito',
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
