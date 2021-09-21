import knex from "knex";
import {
  newProductInterface,
  ProductInterface,
  ProductQueryInterface,
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

  async query(options:ProductQueryInterface):Promise<ProductInterface[]>{
    let query = `this.sqliteDB('productos').where('id','>','0')`;
    if(options.nombre) query += `.andWhere('nombre','=','${options.nombre}')`;
    if(options.codigo) query += `.andWhere('codigo',${options.codigo})`;
    if(options.minPrice) query += `.andWhere('precio','>',${options.minPrice})`
    if(options.maxPrice) query += `.andWhere('precio','<',${options.maxPrice})`;
    if(options.minStock) query += `.andWhere('stock','>',${options.minStock})`
    if(options.minStock) query += `.andWhere('stock','<',${options.maxStock})`

    console.log(query);

  
    return <ProductInterface[]><unknown>await eval(query);
  }

  async findProductsOnCart(){
    return this.sqliteDB({a:'carritos_productos',b:'productos'}).select({id:'b.id',nombre:'b.nombre',descripcion:'b.descripcion',
  precio:'b.precio',stock:'b.stock',foto:'b.foto',codigo:'b.codigo'}).whereRaw('?? = ??', ['a.id_producto', 'b.id'])
  }

  async findProductsOnCartById(id:any):Promise<ProductInterface>{
    console.log(id);
    return this.sqliteDB({a:'carritos_productos',b:'productos'}).select({id:'b.id',nombre:'b.nombre',descripcion:'b.descripcion',
    precio:'b.precio',stock:'b.stock',foto:'b.foto',codigo:'b.codigo'}).whereRaw('?? = ??', ['a.id_producto', 'b.id']).andWhere('b.id','=',id)
  }


  async addProductsToCart(idProducto:number){
    
    await this.sqliteDB('carritos_productos').insert({id_carrito:1,id_producto:idProducto});
    return await this.findById(idProducto);
  }

  async deleteProductsOnCart(idProducto:number){
    await this.sqliteDB('carritos_productos').where('id_producto','=',idProducto).andWhere('id_carrito','=',1).del();
    return this.findById(idProducto)
  }
}
