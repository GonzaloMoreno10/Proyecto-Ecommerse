"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    put: {
        tags: ['User'],
        description: 'Actualizar los datos de un usuario',
        operationId: 'updateUser',
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/UserId',
                },
                required: true,
                description: 'User ID',
            },
        ],
        requestBody: {
            required: 'true',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/UserEdit',
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Usuario actualizado correctamente',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User',
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
            404: {
                description: 'The product to update does not exist.',
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
