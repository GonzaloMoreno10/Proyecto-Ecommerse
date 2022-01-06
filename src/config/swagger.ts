import path from 'path';

export const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Node MongoDB Ecommerce API', version: '1.0.0' },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [`${path.resolve(__dirname, '../routes/*.js')}`],
};
