import getOrders from './getOrders';
import getOrder from './getOrder';
import createOrder from './createOrder';
import compra from './compra';

export default {
  '/ordenes': {
    ...getOrders,
  },
  '/carrito/compra/new/{userId}': {
    ...compra,
  },
  '/ordenes/{id}': {
    ...getOrder,
  },
  '/ordenes/create/{userId}': {
    ...createOrder,
  },
};
