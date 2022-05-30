import getCategorias from './getCategorias';
import createCategoria from './createCategoria';
import getCategoryById from './getCategoryById';

export default {
  '/categories': {
    ...getCategorias,
    ...createCategoria,
  },
  '/categories/{CatId}': {
    ...getCategoryById,
  },
};
