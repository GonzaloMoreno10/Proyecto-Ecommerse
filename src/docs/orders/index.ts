import getOrders from './getOrders';
import getOrder from './getOrder';
import createOrder from './createOrder';

export default {
  '/ordenes': {
    ...getOrders,
  },
  '/ordenes/{id}': {
    ...getOrder,
  },
  '/ordenes/create/{userId}': {
    ...createOrder,
  },
};
