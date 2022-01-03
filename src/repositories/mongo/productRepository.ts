import mongoose from 'mongoose';
import { newProductInterface, ProductInterface, ProductOnCart, ProductQueryInterface } from '../../interface';
import productoModel from '../../models/producto.model';

class ProductRepository {
  private productos: any;

  constructor() {
    this.productos = productoModel;
  }
  //mongodb+srv://admin:<password>@cluster0.6d6g8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  async findAll(): Promise<ProductInterface[]> {
    let products: ProductInterface[] = [];
    products = await this.productos.find();
    return products;
  }

  async findByCategory(categoryId) {
    let productos: ProductInterface = await this.productos.find({ categoria: categoryId });
  }

  async findById(id: string): Promise<ProductInterface | undefined> {
    try {
      let productos = await this.productos.findById(id.toString());
      return productos;
    } catch (err) {
      console.log(err);
    }
  }

  async create(data: newProductInterface): Promise<ProductInterface> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    const newProduct = new this.productos(data);

    let res = await newProduct.save();
    return res;
  }

  async update(id: string, newProductData: newProductInterface): Promise<ProductInterface> {
    try {
      let productos = await this.productos.findByIdAndUpdate(id.toString(), newProductData);
      return productos;
    } catch (err) {
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

    if (options.minPrice && options.maxPrice) query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;

    if (options.minStock && options.maxStock) query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;

    if (options.codigo) query.codigo = options.codigo;

    return this.productos.find(query);
  }
}

export const mongoProductRepository = new ProductRepository();
