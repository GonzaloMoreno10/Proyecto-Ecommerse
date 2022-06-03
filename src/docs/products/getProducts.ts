export default {
  get: {
    tags: ['Products'],
    description: 'Lista todos los productos',
    operationId: 'getProducts',
    parameters: [
      {
        name: 'apikey',
        in: 'header',
        schema: {
          type: 'string',
        },
        default: '51515as1d5as1das1g51gjg6k13jh5mdf3g51dsf',
        description: 'Apikey from product service',
      },
      {
        name: 'authorization',
        in: 'header',
        schema: {
          type: 'string',
        },
        description: 'Bearer token',
      },
      {
        name: 'ProCatId',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Category id',
      },
      {
        name: 'ProTypId',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'SubCategory id',
      },
      {
        name: 'ProCod',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'Product Code',
      },
      {
        name: 'MaxPrice',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Max price',
      },
      {
        name: 'MinPrice',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Min price',
      },
      {
        name: 'MaxStock',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Max stock',
      },
      {
        name: 'MinStock',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Min stock',
      },
      {
        name: 'MaxDiscount',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Max Discount',
      },
      {
        name: 'MinDiscount',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'Min Discount',
      },
      {
        name: 'enabled',
        in: 'query',
        schema: {
          type: 'boolean',
        },
        default: true,
        description: 'Is product enabled?',
      },
      {
        name: 'ProIsOffer',
        in: 'query',
        schema: {
          type: 'boolean',
        },
        default: false,
        description: 'Is offer?',
      },
      {
        name: 'ProUsrId',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'User created',
      },
      {
        name: 'ProName',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'Product name',
      },
      {
        name: 'pageSize',
        in: 'query',
        schema: {
          type: 'number',
        },
        default: 10,
        description: 'Products per page',
      },
      {
        name: 'page',
        in: 'query',
        schema: {
          type: 'number',
        },
        default: 0,
        description: 'Page number',
      },
    ],
    responses: {
      200: {
        description: 'Products',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ObjectSuccess',
            },
          },
        },
      },
      401: {
        escription: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
    },
  },
};
