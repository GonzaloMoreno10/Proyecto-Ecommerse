"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Categoria'],
        description: 'Lista las categorias',
        operationId: 'getCategory',
        responses: {
            200: {
                description: 'Categorias obtenidas',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Category',
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
                description: 'invalid body',
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
