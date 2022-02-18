"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    delete: {
        tags: ['Products'],
        description: 'Eliminar un producto',
        operationId: 'deleteProduct',
        parameters: [
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
                description: 'Producto eliminado correctamente',
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
