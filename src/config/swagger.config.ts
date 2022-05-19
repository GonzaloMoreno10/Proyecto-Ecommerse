import path from 'path';
import { API_URL } from '../constants/venv';

export const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Node MongoDB Ecommerce API', version: '1.0.0' },
    servers: [
      {
        url: API_URL,
      },
    ],
  },
  apis: [`${path.resolve(__dirname, '../routes/*.js')}`],
};
