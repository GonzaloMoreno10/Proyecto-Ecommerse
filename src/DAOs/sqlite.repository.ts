import knex from "knex";
import {
  newProductInterface,
  ProductInterface,
} from "../interface/producto.inteface";

export class SqliteRepository {
  private sqliteDB: any;
  constructor() {
    this.sqliteDB = knex({
      client: "sqlite3",
      connection: { filename: "./ecommerce" },
      useNullAsDefault: false,
    });
  }

  async findAll() {
    return this.sqliteDB.from('productos').select();
  }

  async findById(id:number){
    return this.sqliteDB.from('productos').where('id','=',id).select();
  }

  async create(data: newProductInterface) {
    return this.sqliteDB('productos').insert(data);
  }

  async update(id: number, data: ProductInterface) {
    return this.sqliteDB('productos').where('id','=',id).update(data);
  }

  async delete(id: number) {
    return this.sqliteDB('productos').where('id','=',id).del();
  }
}
