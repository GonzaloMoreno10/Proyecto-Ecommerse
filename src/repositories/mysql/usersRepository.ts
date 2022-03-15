import { IProduct, ProductQueryInterface } from '../../interface';
import { ICategoria } from '../../interface/categoria.interface';
import { IUser, IUserMySql } from '../../models/user.model';
import { mysqlDataSource } from '../../services/mysql';
import bcrypt from 'bcrypt';

class UserRepository {
  private connection = mysqlDataSource.connection();

  async getUsers(): Promise<IUserMySql[]> {
    const query = 'select * from users';
    const result = await this.connection.query(query);
    return <IUserMySql[]>result[0];
  }

  async getUsersById(id: number): Promise<IUserMySql> {
    const query = `select * from users where id = ${id}`;
    const result = await this.connection.query(query);
    return <IUserMySql>(<unknown>result[0]);
  }

  async getUsersByEmail(email: string): Promise<IUserMySql> {
    let query = `select * from users where email = '${email}'`;
    let data = await this.connection.query(query);
    return <IUserMySql>(<unknown>data[0][0]);
  }

  async updateUser(user: IUserMySql, id: number) {
    let query = `update users set nombre = '${user.nombre}',fecha_nacimiento = '${user.fecha_nacimiento}', avatar= '${user.avatar}'`;
    let data = await this.connection.query(query);
    return data[0];
  }

  async setUser(user: IUserMySql) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    let query = `insert into users (email,password,nombre,direccion,fecha_nacimiento,telefono,rol_id,avatar) values ('${user.email}','${user.password}','${user.nombre}','${user.direccion}','${user.fecha_nacimiento}','${user.telefono}',1,'${user.avatar}')`;
    let data = await this.connection.query(query);
    console.log(data[0]);
    return Object.assign(data[0]).insertId;
  }
}

export const mysqlUserRepository = new UserRepository();
