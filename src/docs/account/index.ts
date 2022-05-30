import mailValidation from './mailValidation';
import signup from './signup';

export default {
  '/account/signup': {
    ...signup,
  },
  '/account/mailValidation/{UsrId}': {
    ...mailValidation,
  },
};
