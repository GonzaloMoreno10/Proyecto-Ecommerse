"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['User'],
        description: 'Actualizar avatar del usuario',
        operationId: 'editUserImage',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/UserId',
                },
                required: true,
            },
        ],
        requestBody: {
            required: true,
            content: {
                'multipart/form-data': {
                    schema: {
                        $ref: '#/components/schemas/UserEditPicture',
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'Avatar actualizado correctamente',
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
