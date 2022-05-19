import { model } from 'mongoose';
import { mysqlDataSource } from '../services/mysql.service';

class LineaRepository {
  private connection = mysqlDataSource.connection();

  async getLineas() {
    const sql = 'select * from lineas';
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getLineaById(id: number) {
    const sql = `select * from lineas where id = ${id}`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getLineasByModelo(modeloId: number) {
    const sql = `select * from lineas where modeloId = ${modeloId}`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async setLinea(linea: any) {
    const sql = `insert into lineas (modeloId,nombre) values(${linea.modeloId},'${linea.nombre}')`;
    const result = await this.connection.execute(sql);
    return result[0];
  }
}

export const lineasRepository = new LineaRepository();
