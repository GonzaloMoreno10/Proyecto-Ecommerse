import { IProduct, ProductQueryInterface } from '../../interface';
import { ICategoria } from '../../interface/categoria.interface';
import { mysqlDataSource } from '../../services/mysql';

class ProductRepository {
  private connection = mysqlDataSource.connection();

  async getCategorias(): Promise<ICategoria[]> {
    const query = 'select * from categorias';
    const result = await this.connection.query(query);
    return <ICategoria[]>result[0];
  }

  async getCategoriasById(id: number): Promise<ICategoria> {
    try {
      const query = `select * from categorias where id = ${id}`;
      const result = await this.connection.query(query);
      return <ICategoria>(<unknown>result[0]);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async setCategoria(categoria: ICategoria) {
    let query = `insert into categorias (nombre) values('${categoria.nombre}')`;
    let data = await this.connection.query(query);
    return Object.assign(data[0]).insertId;
  }

  async getCategoriaByNombre(nombre: string) {
    try {
      let query = `select * from categorias where nombre like '%${nombre}%'`;
      let result = await this.connection.query(query);
      return <ICategoria>(<unknown>result[0]);
    } catch (err) {
      return err;
    }
  }

  async deleteCategoria(id: number) {
    let query = `delete categorias where id = ${id}`;
    let data = await this.connection.query(query);
    console.log(data[0]);
    return Object.assign(data[0]);
  }
}

export const mysqlCategoriaRepository = new ProductRepository();
