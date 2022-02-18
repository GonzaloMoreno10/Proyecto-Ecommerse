"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['User'],
        description: 'Crear un nuevo usuario',
        operationId: 'signup',
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: {
                                type: 'string',
                                description: 'User email.',
                                example: 'test5@example.com',
                            },
                            password: {
                                type: 'string',
                                example: 'Secret5*',
                            },
                            nombre: {
                                type: 'string',
                                description: 'User name.',
                                example: 'Jose Perez',
                            },
                            direccion: {
                                type: 'string',
                                description: 'Calle y numero',
                                example: 'Av Colon 333',
                            },
                            edad: {
                                type: 'number',
                                description: 'edad',
                                example: '30',
                            },
                            telefono: {
                                type: 'string',
                                description: 'Telefono ',
                                example: '+56912345678',
                            },
                            admin: {
                                type: 'number',
                                example: '1',
                            },
                        },
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'Usuario creado',
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
        },
    },
};
