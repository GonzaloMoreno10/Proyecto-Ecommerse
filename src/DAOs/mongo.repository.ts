import mongoose from 'mongoose';
import {
  newProductInterface,
  ProductInterface,
  ProductBaseClass
} from '../interface/producto.inteface';
import {Venv} from '../constantes/venv';

const productsSchema = new mongoose.Schema<ProductInterface>({
    nombre: String,
    precio: Number,
    stock: Number,
    codigo: Number,
    foto: String,
    descripcion: String,
});

export class MongoProductsRepository implements ProductBaseClass {
  private srv: string;
  private productos;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Venv.MONGO_DB}`;
    else
      this.srv = `mongodb+srv://${Venv.MONGO_ATLAS_USER}:${Venv.MONGO_ATLAS_PASSWORD}@${Venv.MONGO_ATLAS_CLUSTER}/${Venv.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
      mongoose.connect(this.srv);
      console.log('Se conecto a atlas')
    this.productos = mongoose.model<ProductInterface>('producto', productsSchema);
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

  async findById(id:string):Promise<ProductInterface|undefined>{
      try{
        console.log(id.toString());
        let productos = await this.productos.findById(id.toString())
        console.log(productos);
        return productos;
      }
      catch(err){
        console.log(err);
      }
  }

  async create(data: newProductInterface): Promise<ProductInterface> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    const newProduct = new this.productos(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, newProductData: newProductInterface): Promise<ProductInterface> {
    return this.productos.findByIdAndUpdate(id, newProductData);
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id.toString());
  }

  /*async query(options: ProductQuery): Promise<ProductInterface[]> {
    let query: ProductQuery = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.precio) query.precio = options.precio;

    return this.productos.find(query);
  }*/
}
