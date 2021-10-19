import { api } from '../apis/api';

class UsersController {
  async getUsers(id: any) {
    return api.getUsers(id);
  }
}

export const userController = new UsersController();
