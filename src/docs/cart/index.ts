import deleteProductCart from './deleteProductCart';
import getProductCartById from './getProductCartById';
import getProductsCart from './getProductsCart';
import saveProductCart from './saveProductCart';

export default {
  '/carrito/{userId}': {
    ...getProductsCart,
  },
  '/carrito/{idProducto}/{userId}': {
    ...saveProductCart,
    ...deleteProductCart,
    ...getProductCartById,
  },
};
