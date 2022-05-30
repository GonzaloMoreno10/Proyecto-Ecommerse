import get from './get';
import getById from './getById';
import del from './del';
export default {
  '/productTypes': {
    ...get,
  },
  '/productTypes/{TypId}': {
    ...getById,
    ...del,
  },
};
