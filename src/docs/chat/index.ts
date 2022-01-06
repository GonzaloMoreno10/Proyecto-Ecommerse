import getMessages from './getMessages';

export default {
  '/mensajes/{userEmail}': {
    ...getMessages,
  },
};
