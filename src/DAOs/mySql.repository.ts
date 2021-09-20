import { createPool } from "mysql2/promise";
import { ProductBaseClass, ProductInterface } from "../interface/producto.inteface";
import { Carrito, Producto } from "../models";

export class MySqlProductoRepository implements ProductBaseClass {
  async createConnection() {
    const connection = await createPool({
      host: "localhost",
      user: "root",
      password: "root",
      database: "ecommerce",
    });
    return connection;
  }


  //Productos
  async findAll():Promise<ProductInterface[]>{
    const conexion = await this.createConnection();
    let data = await conexion.query("select * from productos");

    return <ProductInterface[]>data[0];
  }

  async findById(id:any):Promise<ProductInterface | undefined> {
    let Id = parseInt(id);
    const conexion = await this.createConnection();
    let data = await conexion.query(`select * from productos where id = ${Id}`);
    conexion.end();
    return <ProductInterface><unknown>data[0];
  }

  async update(id:any,producto:ProductInterface):Promise<ProductInterface>{
    try{
      let Id = parseInt(id);
      let conexion = await this.createConnection();
    let data = await conexion.query(`update productos set nombre = '${producto.nombre}' , descripcion = '${producto.descripcion}' , codigo = ${producto.codigo} , 
    foto = '${producto.foto}' , precio = ${producto.precio} , stock = ${producto.stock} where id =${Id} `)
    let res = Object.assign(data);
    console.log(res.insertId);
    }
    catch(err){
      return err;
    }
    
  }

  async create(producto:Producto):Promise<ProductInterface>{
    let conexion = await this.createConnection();
    let data = await conexion.query(`insert into productos (nombre,descripcion,codigo,foto,precio,stock) values( '${producto.nombre}','${producto.descripcion}',${producto.codigo}
    ,'${producto.foto}',${producto.precio},${producto.stock})`);
    return Object.assign(data[0]).insertId;

  }

  async delete(id:any):Promise<void>{
    let Id = parseInt(id);
    let conexion = await this.createConnection();
    let prod = await this.findById(id);
    if(prod){
      let data = await conexion.query(`delete from productos where id = ${Id}`);
    }
    
  }


  //Carritos
  async findAllCarts(){
    let conexion = await this.createConnection();
    let data = await conexion.query(`select * from carritos`);
    return data[0];
  }

  async findCartsById(id:number){
    let conexion = await this.createConnection();
    let data = await conexion.query(`select * from carritos where id = ${id}`);
    return data[0];
  }

  async updateCarts(id:number,carrito:Carrito){
    let conexion = await this.createConnection();
    let data = await conexion.query(`update carrito set timestamp = ${carrito.timestamp} where id = ${id}`)
    return data[0];
  }

  async createCarts(carrito:Carrito){
    let conexion = await this.createConnection();
    let data = await conexion.query(`insert into carritos (timestamp) values( ${carrito.timestamp})`)
    return data[0];
  }

  async deleteCarts(id:number){
    let conexion = await this.createConnection();
    let data = await conexion.query(`delete from carritos where id = ${id}`);
    return data[0];
  }
}


