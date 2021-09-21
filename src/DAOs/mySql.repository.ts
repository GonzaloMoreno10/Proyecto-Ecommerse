import { createPool } from "mysql2/promise";
import { Venv } from "../constantes/venv";
import { PersistanceBaseClass, ProductInterface, ProductQueryInterface } from "../interface/producto.inteface";
import { Producto } from "../models";

export class MySqlProductoRepository implements PersistanceBaseClass {
  async createConnection() {
    const connection = await createPool({
      host: "localhost",
      user: Venv.MYSQL_USER,
      password: Venv.MYSQL_PASSWORD,
      database: Venv.MYSQL_DBNAME,
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

  async query(options:ProductQueryInterface):Promise<ProductInterface[]>{
    let conexion = await this.createConnection();
    let query = ' select * from productos where id > 0 ';
    if(options.nombre) query += ` and  nombre = '${options.nombre}' `
    if(options.codigo) query += ` and  codigo = ${options.codigo} `
    if(options.minPrice) query += ` and  precio > ${options.minPrice} `
    if(options.maxPrice) query += ` and  precio < ${options.maxPrice}`
    if(options.minStock) query += ` and  stock > ${options.minStock}`
    if(options.maxStock) query += ` and  stock < ${options.maxStock}`
    console.log(query);
    let data = await conexion.query(query);
    return <ProductInterface[]>data[0]
    
  }


  //Carritos

  async findProductsOnCart():Promise<ProductInterface[]>{
    let conexion = await this.createConnection();
    let data = await conexion.query(`select p.* from carrito_productos cp,productos p where p.id = cp.id_producto`);
    return <ProductInterface[]><unknown>data[0];
  }

  async findProductsOnCartById(id:number):Promise<ProductInterface>{
    let conexion = await this.createConnection();
    let data = await conexion.query(`select p.* from carrito_productos cp,productos p where p.id = cp.id_producto and p.id = ${id}`);
    return <ProductInterface><unknown>data[0];
  }


  async addProductsToCart(idProducto:number){
    let conexion = await this.createConnection();
     await conexion.query(`insert into carrito_productos (id_carrito,id_producto) values(1,${idProducto})`);
    return await this.findById(idProducto);
  }

  async deleteProductsOnCart(idProducto:number){
    let conexion = await this.createConnection();
    let prod = await this.findById(idProducto);
    if(prod){
      await conexion.query(`delete from carrito_productos where id_carrito = 1 and id_producto = ${idProducto}`);
    }
    
    return prod;
  }



}


