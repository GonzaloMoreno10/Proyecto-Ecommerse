"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    delete: {
        tags: ['Cart'],
        description: 'Elimina un producto del carrito',
        operationId: 'deleteProductCart',
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
                    $ref: '#/components/schemas/UserId',
                },
                required: true,
                description: 'User ID',
            },
        ],
        responses: {
            200: {
                description: 'Producto eliminado del carrito',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                            description: 'Producto borrado.',
                            items: {
                                $ref: '#/components/schemas/ProductCart',
                            },
                        },
                    },
                },
            },
            404: {
                description: 'El carrito no existe o el producto no esta en el mismo',
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
