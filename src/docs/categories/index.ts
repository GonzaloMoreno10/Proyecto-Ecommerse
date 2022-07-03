import getCategorias from './getCategorias';
import createCategoria from './createCategoria';
import getCategoryById from './getCategoryById';
import delCategory from './delCategory';
export default {
  '/categories': {
    ...getCategorias,
    ...createCategoria,
  },
  '/categories/{CatId}': {
    ...getCategoryById,
    ...delCategory,
  },
};
