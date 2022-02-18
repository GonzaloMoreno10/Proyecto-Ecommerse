"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['Authentication'],
        description: 'Ingresar al sistema',
        operationId: 'login',
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
                                example: 'test1@example.com',
                            },
                            password: {
                                type: 'string',
                                description: 'User password.',
                                example: 'Secret1*',
                            },
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Obtiene el token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                            properties: {
                                token: {
                                    type: 'string',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxOGJhZWIxMzM4NDQzYTBlYmU1OTk2MCIsImVtYWlsIjoiZ29uemFtb3Jlbm8yMUBnbWFpbC5jb20iLCJub21icmUiOiJHb256YWxvIE1vcmVubyIsImRpcmVjY2lvbiI6IkVsIGNoYWNvIDEzMSIsInRlbGVmb25vIjoiKzU0MzU0ODU3NDUyOSIsImF2YXRhciI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zdG9yYWdlL2ltZ3MvNjE4YmFlYjEzMzg0NDNhMGViZTU5OTYwLmpwZyIsImVkYWQiOjI2LCJhZG1pbiI6MX0sImV4cGlyZXNJbiI6IjI0aCIsImlhdCI6MTY0MTM4ODIwOX0.rtZJkjJoM4YfmWYVa-fk-ffYZBlY0_ISb39AASR2pGQ',
                                },
                            },
                            example: 'token:{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxOGJhZWIxMzM4NDQzYTBlYmU1OTk2MCIsImVtYWlsIjoiZ29uemFtb3Jlbm8yMUBnbWFpbC5jb20iLCJub21icmUiOiJHb256YWxvIE1vcmVubyIsImRpcmVjY2lvbiI6IkVsIGNoYWNvIDEzMSIsInRlbGVmb25vIjoiKzU0MzU0ODU3NDUyOSIsImF2YXRhciI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zdG9yYWdlL2ltZ3MvNjE4YmFlYjEzMzg0NDNhMGViZTU5OTYwLmpwZyIsImVkYWQiOjI2LCJhZG1pbiI6MX0sImV4cGlyZXNJbiI6IjI0aCIsImlhdCI6MTY0MTM4ODIwOX0.rtZJkjJoM4YfmWYVa-fk-ffYZBlY0_ISb39AASR2pGQ}',
                        },
                    },
                },
            },
            400: {
                description: 'Email o usuario invalido',
            },
            401: {
                description: 'Unauthorized',
            },
        },
    },
};
