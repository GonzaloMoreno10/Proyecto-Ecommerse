"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['Products'],
        description: 'Crear un nuevo producto',
        operationId: 'saveProduct',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ProductInputAdd',
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'Producto creado correctamente',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Product',
                        },
                    },
                },
            },
            400: {
                description: 'Invalid body',
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
