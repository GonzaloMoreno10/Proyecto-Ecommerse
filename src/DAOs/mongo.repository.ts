import mongoose from "mongoose";
import {
  newProductInterface,
  ProductInterface,
  PersistanceBaseClass,
  ProductQueryInterface,
} from "../interface/producto.inteface";
import { Venv } from "../constantes/venv";
import { CarritoInterface } from "../interface/carrito.interface";
import { Producto } from "../models";

const productsSchema = new mongoose.Schema<ProductInterface>({
  nombre: String,
  precio: Number,
  stock: Number,
  codigo: Number,
  foto: String,
  descripcion: String,
});


export class MongoRepository implements PersistanceBaseClass {
  private srv: string;
  private productos;

  constructor(local: boolean = false) {
    if (local) this.srv = `mongodb://localhost:27017/${Venv.MONGO_DB}`;
    else
      this.srv = `mongodb+srv://${Venv.MONGO_ATLAS_USER}:${Venv.MONGO_ATLAS_PASSWORD}@${Venv.MONGO_ATLAS_CLUSTER}/${Venv.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv);
    console.log("Se conecto a atlas");
    this.productos = mongoose.model<ProductInterface>(
      "producto",
      productsSchema
    );
    
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
      console.log(productos);
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
    id: string,
    newProductData: newProductInterface
  ): Promise<ProductInterface> {
    return this.productos.findByIdAndUpdate(id, newProductData);
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id.toString());
  }

  async query(options: ProductQueryInterface): Promise<ProductInterface[]> {
    let query: ProductQueryInterface = {};

    console.log("Entre a query");
    console.log(options.nombre);

    if (options.nombre) query.nombre = options.nombre;

    if (options.minPrice && options.maxPrice)
      query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;

    if (options.minStock && options.maxStock)
      query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;

    if (options.codigo) query.codigo = options.codigo;

    console.log(query);

    return this.productos.find(query);
  }


  findProductsOnCart(): Promise<ProductInterface[]> {
    throw new Error("Method not implemented.");
  }
  findProductsOnCartById(id: any): Promise<ProductInterface> {
    throw new Error("Method not implemented.");
  }
  deleteProductsOnCart(id: any): Promise<ProductInterface> {
    throw new Error("Method not implemented.");
  }
  addProductsToCart(idProducto: any): Promise<ProductInterface> {
    throw new Error("Method not implemented.");
  }

}
