import { model } from 'mongoose';
import { ImarcaModeloLinea } from '../../interface/marcaModeloLinea';
import { mysqlDataSource } from '../../services/mysql';

class MarcaModeloLineaRepository {
  private connection = mysqlDataSource.connection();

  async getMarcaModeloLinea() {
    const sql = 'select * from marcaModeloLinea';
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getMarcaModeloLineaById(id: number) {
    const sql = `select * from marcaModeloLinea where id = ${id}`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async setMarcaModeloLinea(mmm: ImarcaModeloLinea) {
    const sql = `insert into marcaModeloLinea (marcaId,modeloId,lineaId) values(${mmm.marcaId},${mmm.modeloId},${mmm.lineaId})`;
    const result = await this.connection.execute(sql);
    console.log(result[0]);
    return Object.assign(result[0]).insertId;
  }
}

export const marcaModeloLineaRepository = new MarcaModeloLineaRepository();
