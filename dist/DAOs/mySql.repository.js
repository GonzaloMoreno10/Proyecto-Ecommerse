// import { createPool } from 'mysql2/promise';
// import { MYSQL_DBNAME, MYSQL_PASSWORD, MYSQL_USER } from '../constantes/venv';
// import { PersistanceBaseClass, ProductInterface, ProductQueryInterface } from '../interface/producto.inteface';
// import { Producto } from '../models';
// export class MySqlProductoRepository implements PersistanceBaseClass {
//   async createConnection() {
//     const connection = await createPool({
//       host: 'localhost',
//       user: MYSQL_USER,
//       password: MYSQL_PASSWORD,
//       database: MYSQL_DBNAME,
//     });
//     return connection;
//   }
//   //Productos
//   async findAll(): Promise<ProductInterface[]> {
//     const conexion = await this.createConnection();
//     let data = await conexion.query('select * from productos where enabled = 1');
//     return <ProductInterface[]>data[0];
//   }
//   async findById(id: any): Promise<ProductInterface | undefined> {
//     let Id = parseInt(id);
//     const conexion = await this.createConnection();
//     let data = await conexion.query(`select * from productos where id = ${Id} and enabled = 1`);
//     conexion.end();
//     return <ProductInterface>(<unknown>data[0]);
//   }
//   async update(id: any, producto: ProductInterface): Promise<ProductInterface> {
//     try {
//       let Id = parseInt(id);
//       let conexion = await this.createConnection();
//       let data =
//         await conexion.query(`update productos set nombre = '${producto.nombre}' , descripcion = '${producto.descripcion}' , codigo = ${producto.codigo} ,
//     foto = '${producto.foto}' , precio = ${producto.precio} , stock = ${producto.stock} where id =${Id}`);
//       let res = Object.assign(data);
//       console.log(res.insertId);
//     } catch (err) {
//       return err;
//     }
//   }
//   async create(producto: Producto): Promise<ProductInterface> {
//     let conexion = await this.createConnection();
//     let data =
//       await conexion.query(`insert into productos (nombre,descripcion,codigo,foto,precio,stock,enabled) values( '${producto.nombre}','${producto.descripcion}',${producto.codigo}
//     ,'${producto.foto}',${producto.precio},${producto.stock},1)`);
//     return Object.assign(data[0]).insertId;
//   }
//   async delete(id: any): Promise<void> {
//     let Id = parseInt(id);
//     let conexion = await this.createConnection();
//     let prod = await this.findById(id);
//     if (prod) {
//       let data = await conexion.query(`update productos set enabled = 0 where id = ${id}`);
//     }
//   }
//   async query(options: ProductQueryInterface): Promise<ProductInterface[]> {
//     let conexion = await this.createConnection();
//     let query = ' select * from productos where 1 = 1 ';
//     if (options.nombre) query += ` and  nombre = '${options.nombre}' `;
//     if (options.codigo) query += ` and  codigo = ${options.codigo} `;
//     if (options.minPrice) query += ` and  precio > ${options.minPrice} `;
//     if (options.maxPrice) query += ` and  precio < ${options.maxPrice}`;
//     if (options.minStock) query += ` and  stock > ${options.minStock}`;
//     if (options.maxStock) query += ` and  stock < ${options.maxStock}`;
//     console.log(query);
//     let data = await conexion.query(query);
//     return <ProductInterface[]>data[0];
//   }
//   //Carritos
//   async findProductsOnCart(): Promise<ProductInterface[]> {
//     let conexion = await this.createConnection();
//     let data = await conexion.query(`select p.* from carrito_productos cp,productos p where p.id = cp.id_producto`);
//     return <ProductInterface[]>(<unknown>data[0]);
//   }
//   async findProductsOnCartById(id: number): Promise<ProductInterface> {
//     let conexion = await this.createConnection();
//     let data = await conexion.query(
//       `select p.* from carrito_productos cp,productos p where p.id = cp.id_producto and p.id = ${id}`
//     );
//     console.log(data[0]);
//     return <ProductInterface>(<unknown>data[0]);
//   }
//   async addProductsToCart(idProducto: number): Promise<any> {
//     let conexion = await this.createConnection();
//     let existsInCart = await this.findProductsOnCartById(idProducto);
//     let existProduct = await this.findById(idProducto);
//     if (existProduct[0]) {
//       if (!existsInCart[0]) {
//         await conexion.query(`insert into carrito_productos (id_carrito,id_producto) values(1,${idProducto})`);
//         return await this.findById(idProducto);
//       } else {
//         return -1;
//       }
//     } else {
//       return -2;
//     }
//   }
//   async deleteProductsOnCart(idProducto: number) {
//     let conexion = await this.createConnection();
//     let prod = await this.findById(idProducto);
//     if (prod) {
//       await conexion.query(`delete from carrito_productos where id_carrito = 1 and id_producto = ${idProducto}`);
//     }
//     return prod;
//   }
// }
