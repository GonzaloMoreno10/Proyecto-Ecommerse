import { ProductOnCart } from '../../interface';
import { NewCarritoInterface } from '../../interface/carrito.interface';
import { mongoProductRepository } from './productRepository';
import carritoModel from '../../models/carrito.model';
export class CarritoRepository {
  private carritos: any;
  constructor() {
    this.carritos = carritoModel;
  }

  async findProductsOnCart(userId: string): Promise<ProductOnCart[]> {
    let carrito = await this.findCartByUser(userId);
    return carrito.productos;
  }
  async findProductsOnCartById(id: any, userId: string): Promise<ProductOnCart> {
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

  async deleteProductsOnCart(id: any, userId: string): Promise<ProductOnCart> {
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
  async addProductsToCart(idProducto: any, cantidad: number, userId: string): Promise<any> {
    let carrito = await this.findCartByUser(userId);
    let producto = await mongoProductRepository.findById(idProducto);
    let productos = carrito.productos;

    const productOnCart: ProductOnCart = {
      _id: producto._id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      codigo: producto.codigo,
      foto: producto.foto,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      cantidad: cantidad,
      precioTotal: producto.precio * cantidad,
    };
    console.log(productOnCart);
    productos.push(productOnCart);

    carrito.productos = productos;

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
