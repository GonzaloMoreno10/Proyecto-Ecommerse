import { model } from 'mongoose';
import { mysqlDataSource } from '../services/mysql.service';

class ModeloRepository {
  private connection = mysqlDataSource.connection();

  async getModelos() {
    const sql = 'select * from modelos';
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getModelosById(id) {
    const sql = `select * from modelos where id = ${id}`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getModelosByMarca(marcaId: number) {
    const sql = `select * from modelos where marcaId = ${marcaId}`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async createModel(modelo: any) {
    const sql = `insert into modelos (marcaId,nombre) values(${modelo.marcaId},'${modelo.nombre}')`;
    const result = await this.connection.execute(sql);
    return result[0];
  }
}

export const modeloRepository = new ModeloRepository();
