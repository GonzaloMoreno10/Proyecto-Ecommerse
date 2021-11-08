import mongoose from 'mongoose';
import connect from '../../config/mongoDbConnect';
import { ProductInterface } from '../../interface';
import { CarritoInterface } from '../../interface/carrito.interface';
import { mongoProductRepository } from './productRepository';
const carritosSchema = new mongoose.Schema<CarritoInterface>({
  timestamp: Date,
  productos: [
    {
      _id: Number,
      nombre: String,
      precio: Number,
      stock: Number,
      codigo: Number,
      foto: String,
      descripcion: String,
    },
  ],
});

export class CarritoRepository {
  private srv: string;
  private carritos: any;
  constructor() {
    connect(this.srv);
    this.carritos = mongoose.model<CarritoInterface>('carritos', carritosSchema);
  }

  async findProductsOnCart(): Promise<ProductInterface[]> {
    let carrito = await this.carritos.find();
    return carrito[0].productos;
  }
  async findProductsOnCartById(id: any): Promise<ProductInterface> {
    let carrito = await this.carritos.find();
    let productos = carrito[0].productos;
    //console.log(productos);
    for (let i in productos) {
      if (productos[i] !== null) {
        if (productos[i]._id.equals(id)) {
          return productos[i];
        }
      }
    }
  }
  async deleteProductsOnCart(id: any): Promise<ProductInterface> {
    let carrito = await this.carritos.find();
    let cart = carrito[0];
    let productos = cart.productos;
    for (let i = 0; i < productos.length; i++) {
      if (productos[i] !== null) {
        if (productos[i]._id.equals(id)) {
          if (productos.length > 1) {
            productos.splice(i, 1);
            console.log(productos);
            cart.productos = productos;
          } else {
            cart.productos = [];
          }
        }
      }
    }
    return await this.carritos.findByIdAndUpdate(carrito[0].id, cart);
  }
  async addProductsToCart(idProducto: any): Promise<ProductInterface> {
    let carrito = await this.carritos.find();
    let producto = await mongoProductRepository.findById(idProducto);
    let productos = carrito[0].productos;
    productos.push(producto);
    carrito[0].productos = productos;
    return await this.carritos.findByIdAndUpdate(carrito[0].id, carrito[0]);
  }
}

export const mongoCarritoRepository = new CarritoRepository();
