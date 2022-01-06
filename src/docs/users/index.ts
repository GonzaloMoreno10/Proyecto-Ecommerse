import editPicture from './editPicture';
import editUser from './editUser';
import getUser from './getUser';
import getUsers from './getUsers';
import signup from './signup';

export default {
  '/usuarios': {
    ...getUsers,
  },
  '/usuarios/signup': {
    ...signup,
  },
  '/usuarios/{id}': {
    ...getUser,
    ...editUser,
  },
  '/usuarios/editPicture/{userId}': {
    ...editPicture,
  },
};
