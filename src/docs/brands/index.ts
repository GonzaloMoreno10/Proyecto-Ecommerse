import getBrands from './getBrands';
import getBrandById from './getBrandById';
import createBrand from './createBrand';
import delBrand from './delBrand';
export default {
  '/brands': {
    ...getBrands,
    ...createBrand,
  },
  '/brands/{BraId}': {
    ...getBrandById,
    ...delBrand,
  },
};
