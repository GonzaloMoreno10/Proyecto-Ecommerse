"use strict";
/*import { mySQLDB } from '../../datasource/database';
import { productoPersistanceInterface } from '../../interface/productoPersistance.inteface';
import { Producto } from '../../models';

class MySqlCarritoRepository implements productoPersistanceInterface {
  async findAll() {
    return mySQLDB.from('productos').join('carrito','id','id_carrito')
  }

  async findById(id:number) {
    return mySQLDB.from('productos').where({ id: id }).select();
  }
  async create(data:Producto) {
    return mySQLDB('productos').insert(data);
  }

  async update(id:number, data:Producto) {
    return mySQLDB.from('productos').where({ id }).update(data);
  }

  async delete(id:number) {
    return mySQLDB.from('productos').where({ id }).del();
  }
}

export const productos = new MySqlCarritoRepository();*/ 
