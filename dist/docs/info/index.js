"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    '/server/info': {
        get: {
            tags: ['Server Info'],
            description: 'Obtiene la configuracion del server en html',
            operationId: 'info',
            parameters: [],
            responses: {
                200: {
                    description: 'Configuracion obtenida',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                description: 'Informacion del servidor',
                                properties: {
                                    message: {
                                        type: 'string',
                                        description: 'Informacion del servidor en pugjs',
                                        example: 'Informacion del servidor en pugjs',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
