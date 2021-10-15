import mongoose from "mongoose";
import {
  newProductInterface,
  ProductInterface,
  PersistanceBaseClass,
  ProductQueryInterface,
} from "../interface/producto.inteface";
import { Venv } from "../constantes/venv";
import { CarritoInterface } from "../interface/carrito.interface";
import { userInterface } from "../interface/user.interface";

const productsSchema = new mongoose.Schema<ProductInterface>({
  nombre: String,
  precio: Number,
  stock: Number,
  codigo: Number,
  foto: String,
  descripcion: String,
});

const carritosSchema = new mongoose.Schema<CarritoInterface>({
  timestamp: Date,
  productos: [
    {
      nombre: String,
      precio: Number,
      stock: Number,
      codigo: Number,
      foto: String,
      descripcion: String,
    },
  ],
});


export class MongoRepository implements PersistanceBaseClass {
  private srv: string;
  private productos;
  private carritos;

  constructor(local: boolean = false) {
    if (local) this.srv = `mongodb://localhost:27017/${Venv.MONGO_DB}`;
    else
      this.srv = `mongodb+srv://${Venv.MONGO_ATLAS_USER}:${Venv.MONGO_ATLAS_PASSWORD}@${Venv.MONGO_ATLAS_CLUSTER}/${Venv.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv);
    this.productos = mongoose.model<ProductInterface>(
      "productos",
      productsSchema
    );
    this.carritos = mongoose.model<CarritoInterface>(
      "carritos",
      carritosSchema
    );
  }
  getUsers(): Promise<userInterface> {
    throw new Error("Method not implemented.");
  }
  getUsersById(id: any): Promise<userInterface> {
    throw new Error("Method not implemented.");
  }
  getUsersByUserName(userName: String): Promise<userInterface> {
    throw new Error("Method not implemented.");
  }

  //mongodb+srv://admin:<password>@cluster0.6d6g8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  async findAll(): Promise<ProductInterface[]> {
    let output: ProductInterface[] = [];
    try {
      output = await this.productos.find();
      return output;
    } catch (err) {
      return output;
    }
  }

  async findById(id: string): Promise<ProductInterface | undefined> {
    try {
      let productos = await this.productos.findById(id.toString());
      //console.log(productos);
      return productos;
    } catch (err) {
      console.log(err);
    }
  }

  async create(data: newProductInterface): Promise<ProductInterface> {
    if (!data.nombre || !data.precio) throw new Error("invalid data");

    const newProduct = new this.productos(data);
    await newProduct.save();

    return newProduct;
  }

  async update(
    id:string,
    newProductData: newProductInterface
  ): Promise<ProductInterface> {
    try{
      let productos = await this.productos.findByIdAndUpdate(id.toString(), newProductData);
     //console.log(productos);
      return productos;
    }
    catch(err){
      console.log(err);
      return null;
    }
     
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id.toString());
  }

  async query(options: ProductQueryInterface): Promise<ProductInterface[]> {
    let query: ProductQueryInterface = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.minPrice && options.maxPrice)
      query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;

    if (options.minStock && options.maxStock)
      query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;

    if (options.codigo) query.codigo = options.codigo;

    console.log(query);

    return this.productos.find(query);
  }

  async findProductsOnCart(): Promise<ProductInterface[]> {
    let carrito = await this.carritos.find();
    return carrito[0].productos;
  }
  async findProductsOnCartById(id: any): Promise<ProductInterface> {
    let carrito = await this.carritos.find();
    let productos = carrito[0].productos;
    //console.log(productos);
    for(let i in productos){
      if(productos[i] !== null){
        if(productos[i]._id.equals(id)){
           return productos[i];
        }
      }
    }
  }
  async deleteProductsOnCart(id: any): Promise<ProductInterface> {
    let carrito = await this.carritos.find();
    let cart = carrito[0];
    let productos = cart.productos;
    for(let i= 0 ; i < productos.length;i++){
      if(productos[i] !== null){
        if(productos[i]._id.equals(id)){
          if(productos.length > 1){
            productos.splice(i,1);
            console.log(productos);
            cart.productos = productos;
          }
          else{
            cart.productos = [];
          }
           
        }
      }
    }
    return await this.carritos.findByIdAndUpdate(carrito[0].id, cart)

  }
  async addProductsToCart(idProducto: any): Promise<ProductInterface> {
    let carrito = await this.carritos.find();
    let producto = await this.findById(idProducto);
    let productos = carrito[0].productos;
    productos.push(producto);
    carrito[0].productos = productos;
    return await this.carritos.findByIdAndUpdate(carrito[0].id, carrito[0])
    
  }
}
