import basicInfo from './basicInfo';
import components from './components';
import login from './auth';
import orders from './orders';
import products from './products';
import servers from './servers';
import tags from './tags';
import account from './account';
import info from './info';
import categorias from './categories';
import subCategories from './subCategories';
import brands from './brands';
import models from './_model';

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...products,
    ...login,
    ...account,
    ...orders,
    ...info,
    ...categorias,
    ...brands,
    ...models,
    ...subCategories,
  },
};
