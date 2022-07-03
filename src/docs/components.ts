export default {
  components: {
    schemas: {
      ProductId: {
        type: 'string',
        description: 'An id of a product',
        example: '61717f366466441a1936e9fa',
      },
      UserId: {
        type: 'string',
        description: 'An id of an user.',
        example: '6185584bc0d33bdb01a32966',
      },
      OrderId: {
        type: 'string',
        description: 'An id of an order.',
        example: '61a6bba3f5c7da3594512795',
      },
      User: {
        type: 'object',
        description: 'User data.',
        properties: {
          _id: {
            type: 'string',
            description: 'User id.',
            example: '61855811efae7a5e849ebb9c',
          },
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@example.com',
          },
          nombre: {
            type: 'string',
            description: 'User name.',
            example: 'Jose Perez',
          },
          direccion: {
            type: 'string',
            description: 'User address street.',
            example: 'Providencia',
          },
          edad: {
            type: 'string',
            description: 'User address street number.',
            example: '1550',
          },
          telefono: {
            type: 'string',
            description: 'User address floor number, optional.',
            example: '1',
          },
          avatar: {
            type: 'string',
            description: 'User address department number, optional.',
            example: '23',
          },
          password: {
            type: 'string',
            description: 'User postal code.',
            example: '1234567',
          },
          admin: {
            type: 'number',
            description: 'Determines if an user is admin or not.',
            example: 1,
          },
        },
      },
      UserEdit: {
        type: 'object',
        description: 'User data.',
        properties: {
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@example.com',
          },
          nombre: {
            type: 'string',
            description: 'User name.',
            example: 'Jose Perez',
          },
          direccion: {
            type: 'string',
            description: 'User address street.',
            example: 'Providencia',
          },
          edad: {
            type: 'string',
            description: 'User address street number.',
            example: '1550',
          },
          telefono: {
            type: 'string',
            description: 'User address floor number, optional.',
            example: '1',
          },
          admin: {
            type: 'number',
            description: 'Determines if an user is admin or not.',
            example: 1,
          },
        },
      },
      ObjectSuccess: {
        type: 'object',
        description: 'Success template',
        properties: {
          code: {
            type: 'number',
            description: 'Success code',
            example: '200',
          },
          message: {
            type: 'string',
            description: 'Success message',
            example: 'Exito',
          },
          result: {
            type: 'object',
            description: 'Response result',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        description: 'Error response',
        properties: {
          code: {
            type: 'number',
            description: 'Http status',
            example: '401',
          },
          errors: {
            type: 'object',
            properties: {
              schema: {
                $ref: '#/components/schemas/ObjectError',
              },
            },
          },
        },
      },
      ObjectError: {
        type: 'object',
        description: 'Error template',
        properties: {
          code: {
            type: 'string',
            description: 'Error code',
            example: 'ERROR CODE',
          },
          message: {
            type: 'string',
            description: 'Error message',
            example: 'Error message',
          },
        },
      },
      UserData: {
        type: 'object',
        description: 'Logged in user data.',
        properties: {
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@example.com',
          },
          nombre: {
            type: 'string',
            description: 'User name.',
            example: 'Jose Perez',
          },
          calle: {
            type: 'string',
            description: 'User address street.',
            example: 'Providencia',
          },
          altura: {
            type: 'string',
            description: 'User address street number.',
            example: '1550',
          },
          piso: {
            type: 'string',
            description: 'User address floor number, optional.',
            example: '1',
          },
          depto: {
            type: 'string',
            description: 'User address department number, optional.',
            example: '23',
          },
          codigoPostal: {
            type: 'string',
            description: 'User postal code.',
            example: '1234567',
          },
          edad: {
            type: 'number',
            description: 'User age.',
            example: '30',
          },
          telefono: {
            type: 'string',
            description: 'User phone number, with international code.',
            example: '+56912345678',
          },
          foto: {
            type: 'string',
            description: 'Path to where the user picture is sotraged.',
            example: 'uploads/foto-test1@example.com.png',
          },
          admin: {
            type: 'boolean',
            description: 'Determines if an user is admin or not.',
            example: false,
          },
        },
      },
      Token: {
        type: 'object',
        description: 'Access token',
        properties: {
          token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxOGJhZWIxMzM4NDQzYTBlYmU1OTk2MCIsImVtYWlsIjoiZ29uemFtb3Jlbm8yMUBnbWFpbC5jb20iLCJub21icmUiOiJHb256YWxvIE1vcmVubyIsImRpcmVjY2lvbiI6IkVsIGNoYWNvIDEzMSIsInRlbGVmb25vIjoiKzU0MzU0ODU3NDUyOSIsImF2YXRhciI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zdG9yYWdlL2ltZ3MvNjE4YmFlYjEzMzg0NDNhMGViZTU5OTYwLmpwZyIsImVkYWQiOjI2LCJhZG1pbiI6MX0sImV4cGlyZXNJbiI6IjI0aCIsImlhdCI6MTY0MTM4NzgyMn0.u2et6X2QubQbBigq_EFZ0YWtfNuD_zIm391vTwcd9Gs',
          },
        },
      },
      Product: {
        type: 'object',
        description: 'A product.',
        properties: {
          id: {
            type: 'string',
            description: 'Product identification id',
            example: '61717f366466441a1936e9fa',
          },
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Tahini Paste',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example:
              'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
          },
          codigo: {
            type: 'string',
            description: 'Product code',
            example: 'ECOM-1234-1234',
          },
          precio: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'Home',
          },
          fotos: {
            type: 'array',
            description: 'Product images urls',
            items: {
              type: 'string',
              example: 'https://res.cloudinary.com/alais29/image/upload/v1639511210/Products/hbi9dqnu5u3mq3qxsb6y.jpg',
            },
          },
          fotosId: {
            type: 'array',
            description: 'Product images ids urls',
            items: {
              type: 'string',
              example: 'Products/hbi9dqnu5u3mq3qxsb6y',
            },
          },
          timestamp: {
            type: 'string',
            description: 'Product time and date of creation',
            example: '21/10/2021 11:54:40',
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          nombre: {
            type: 'string',
            description: 'Category name',
            example: 'Test category',
          },
          _id: {
            type: 'string',
            descripcion: 'Category id',
            example: '1asd1as5d1as2d1as2d1as5',
          },
        },
      },
      ProductInputAdd: {
        type: 'object',
        description: 'Product data when saving a new product.',
        properties: {
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Test Product',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example:
              'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
          },
          codigo: {
            type: 'number',
            description: 'Product code',
            example: '13151',
          },
          precio: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          categoria: {
            type: 'string',
            description: 'Product category',
            example: '61c398125e566d9ff068c61c',
          },
          foto: {
            type: 'string',
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      UserEditPicture: {
        type: 'object',
        properties: {
          avatar: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      ProductInputEdit: {
        type: 'object',
        description: 'Product data when editing a product.',
        properties: {
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Test Product',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example:
              'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
          },
          codigo: {
            type: 'number',
            description: 'Product code',
            example: '1235',
          },
          precio: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          categoria: {
            type: 'string',
            description: 'Product category',
            example: '61899c1356fcd1c524084c29',
          },
          foto: {
            type: 'string',
            example: 'https://res.cloudinary.com/alais29/image/upload/v1639511210/Products/hbi9dqnu5u3mq3qxsb6y.jpg',
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      ProductCart: {
        type: 'object',
        description: 'A product in the cart.',
        properties: {
          producto: {
            $ref: '#/components/schemas/Product',
          },
          quantity: {
            type: 'number',
            description: 'Amount of this product in the cart.',
            example: '1',
          },
        },
      },
      Brands: {
        type: 'object',
        description: 'A product in the cart.',
        properties: {
          BraName: {
            type: 'number',
            description: 'Brand name',
          },
        },
      },
      ProductOrder: {
        type: 'object',
        description: 'A product in an order.',
        properties: {
          producto: {
            type: 'object',
            properties: {
              nombre: {
                type: 'string',
                description: 'Product name',
                example: 'Test Product',
              },
              descripcion: {
                type: 'string',
                description: 'Product description',
                example:
                  'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
              },
              precio: {
                type: 'number',
                description: 'Product price',
                example: '123.4',
              },
              id: {
                $ref: '#/components/schemas/ProductId',
              },
            },
          },
          quantity: {
            type: 'number',
            description: 'Amount of this product in the order.',
            example: '1',
          },
        },
      },
      Order: {
        type: 'object',
        description: 'An Order.',
        properties: {
          items: {
            $ref: '#/components/schemas/ProductOrder',
          },
          nroOrden: {
            type: 'number',
            example: 123,
          },
          timestamp: {
            type: 'string',
            description: 'Date and time when the order was created.',
            example: '2021-12-01T00:02:43.013Z',
          },
          estado: {
            type: 'string',
            description: 'Order status',
            example: '1',
          },
          email: {
            type: 'string',
            example: 'example@example.com',
          },
          user: {
            $ref: '#/components/schemas/UserId',
          },
          total: {
            type: 'number',
            description: 'Total price of the order.',
            example: '1500',
          },
          id: {
            $ref: '#/components/schemas/OrderId',
          },
        },
      },
      Message: {
        type: 'object',
        description: 'A chat message.',
        properties: {
          user: {
            $ref: '#/components/schemas/User',
          },
          text: {
            type: 'string',
            description: 'Text in the message.',
            example: 'Hola',
          },
          type: {
            type: 'string',
            description: 'Indicates if the message was sent by the user ("usuario") or by the system ("sistema").',
            example: 'sistema',
          },
          date: {
            type: 'string',
            description: 'Creation date of the message.',
            example: '2021-11-29T18:44:55.533Z',
          },
          id: {
            type: 'string',
            description: 'Message id.',
            example: '61a51fa72e460752431763bd',
          },
        },
      },
      Error: {
        type: 'object',
        description: 'Error structure.',
        properties: {
          error: {
            type: 'string',
            description: 'Error internal code.',
            example: '-4',
          },
          name: {
            type: 'string',
            description: 'Name of the error class.',
            example: 'NotFound',
          },
          message: {
            type: 'string',
            description: 'Error message.',
            example: 'Producto no encontrado',
          },
          stack: {
            type: 'string',
            description: 'Error stack trace',
            example:
              'NotFound: Producto no encontrado\n    at new BaseError (/home/alizardo/Projects/coderhouse-ecommerce/back/src/errors/index.ts:13:11)\n    at new NotFound (/home/alizardo/Projects/coderhouse-ecommerce/back/src/errors/index.ts:36:5)\n    at ProductosModelMongoDb.<anonymous> (/home/alizardo/Projects/coderhouse-ecommerce/back/src/models/mongoDb/producto.ts:83:15)\n    at Generator.throw (<anonymous>)\n    at rejected (/home/alizardo/Projects/coderhouse-ecommerce/back/src/models/mongoDb/producto.ts:6:65)\n    at processTicksAndRejections (internal/process/task_queues.js:93:5)',
          },
          descripcion: {
            type: 'string',
            description: 'Error description, can be present or not.',
            example: 'Faltan los siguientes campos: nombre',
          },
        },
      },
    },
  },
};
