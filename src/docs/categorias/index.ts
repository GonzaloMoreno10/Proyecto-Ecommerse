import getCategorias from './getCategorias';
import createCategoria from './createCategoria';

export default {
  '/categorias': {
    ...getCategorias,
    ...createCategoria,
  },
};
