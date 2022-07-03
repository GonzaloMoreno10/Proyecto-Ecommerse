import getModels from './getModels';
import createModel from './createModel';
import delModel from './delModel';
import getModelById from './getModelById';
export default {
  '/models': {
    ...getModels,
    ...createModel,
    ...delModel,
  },
  '/models/{ModId}': {
    ...getModelById,
  },
};
