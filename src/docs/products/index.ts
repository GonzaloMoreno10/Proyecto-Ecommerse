import deleteProduct from './deleteProduct';
import getProduct from './getProduct';
import getProducts from './getProducts';
import saveProduct from './saveProduct';
import updateProduct from './updateProduct';

export default {
  '/products': {
    ...getProducts,
    ...saveProduct,
  },
  '/products/{id}': {
    ...getProduct,
    ...updateProduct,
    ...deleteProduct,
  },
};
