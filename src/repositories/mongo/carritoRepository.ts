import mongoose from 'mongoose';
import connect from '../../config/mongoDbConnect';
import { ProductInterface } from '../../interface';
import { CarritoInterface, NewCarritoInterface } from '../../interface/carrito.interface';
import { Carrito } from '../../models';
import { mongoProductRepository } from './productRepository';
const carritosSchema = new mongoose.Schema<CarritoInterface>({
  timestamp: Date,
  userId: String,
  productos: [
    {
      prodId: Object,
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

  async findProductsOnCart(userId: string): Promise<ProductInterface[]> {
    let carrito = await this.findCartByUser(userId);
    return carrito.productos;
  }
  async findProductsOnCartById(id: any, userId: string): Promise<ProductInterface> {
    let carrito = await this.findCartByUser(userId);

    let productos = carrito.productos;
    for (let i in productos) {
      if (productos[i] !== null) {
        if (productos[i]._id.equals(id)) {
          return productos[i];
        }
      }
    }
  }

  async vaciarCarrito(userId: string) {
    let carrito = await this.findCartByUser(userId);
    carrito.productos = [];
    await this.carritos.findByIdAndUpdate(carrito._id, carrito);
  }

  async deleteProductsOnCart(id: any, userId: string): Promise<ProductInterface> {
    let cart = await this.findCartByUser(userId);
    let productos = cart.productos;
    for (let i = 0; i < productos.length; i++) {
      if (productos[i] !== null) {
        if (productos[i]._id.equals(id)) {
          if (productos.length > 1) {
            productos.splice(i, 1);

            cart.productos = productos;
          } else {
            cart.productos = [];
          }
        }
      }
    }
    return await this.carritos.findByIdAndUpdate(cart._id, cart);
  }
  async addProductsToCart(idProducto: any, userId): Promise<ProductInterface> {
    let carrito = await this.findCartByUser(userId);
    let producto = await mongoProductRepository.findById(idProducto);
    let productos = carrito.productos;

    productos.push(producto);
    console.log(productos);

    carrito.productos = productos;
    console.log(carrito);
    return await this.carritos.findByIdAndUpdate(carrito._id, carrito);
  }

  async findCartByUser(userId) {
    let carrito = await this.carritos.findOne({ userId: userId });
    return carrito ? carrito : null;
  }

  async createCart(userId) {
    let carrito: NewCarritoInterface = {
      userId: userId,
      timestamp: new Date(),
      productos: [],
    };

    await this.carritos.create(carrito);
  }
}

export const mongoCarritoRepository = new CarritoRepository();
