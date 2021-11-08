import { CarritoInterface } from '../interface/carrito.interface';
import {
  newProductInterface,
  ProductInterface,
  PersistanceBaseClass,
  ProductQueryInterface,
} from '../interface/producto.inteface';
import { Producto } from '../models';

export class MemoriaRepository implements PersistanceBaseClass {
  private productos: ProductInterface[] = [];
  private carrito: CarritoInterface;
  constructor() {
    const mockData = [
      {
        id: 1,
        nombre: 'lapiz',
        codigo: 1,
        foto: '',
        descripcion: '',
        precio: 100,
        stock: 10,
      },
      {
        id: 2,
        nombre: 'cartuchera',
        codigo: 1,
        foto: '',
        descripcion: '',
        precio: 100,
        stock: 10,
      },
      {
        id: 3,
        nombre: 'boligoma',
        codigo: 1,
        foto: '',
        descripcion: '',
        precio: 100,
        stock: 10,
      },
    ];

    mockData.forEach(aMock => this.productos.push(aMock));

    //mockData.forEach((aMock) => this.carrito.productos.push(aMock));

    this.carrito = { id: 1, timestamp: new Date(), productos: mockData };
  }

  findIndex(id: string) {
    return this.productos.findIndex(aProduct => aProduct.id == id);
  }

  async findAll(): Promise<ProductInterface[] | undefined> {
    return this.productos;
  }

  async findById(id: any): Promise<ProductInterface> {
    for (let i in this.productos) {
      if (this.productos[i].id === id) {
        return this.productos[i];
      }
    }
  }

  async create(data: newProductInterface): Promise<ProductInterface> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    const newItem: ProductInterface = {
      id: (this.productos.length + 1).toString(),
      nombre: data.nombre,
      precio: data.precio,
      stock: data.stock,
      codigo: data.codigo,
      foto: data.foto,
      descripcion: data.descripcion,
    };

    this.productos.push(newItem);

    return newItem;
  }

  async update(id: string, newProductData: newProductInterface): Promise<ProductInterface> {
    const index = this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: ProductInterface = {
      ...oldProduct,
      ...newProductData,
    };
    this.productos.splice(index, 1, updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const index = this.findIndex(id);
    this.productos.splice(index, 1);
  }

  async query(options: ProductQueryInterface): Promise<ProductInterface[]> {
    type Conditions = (aProduct: ProductInterface) => boolean;
    const query: Conditions[] = [];

    if (options.nombre) query.push((aProduct: ProductInterface) => aProduct.nombre == options.nombre);

    if (options.codigo) query.push((aProduct: ProductInterface) => aProduct.codigo == options.codigo);

    if (options.minStock && options.maxStock) {
      query.push(
        (aProduct: ProductInterface) => aProduct.stock > options.minStock && aProduct.stock < options.maxStock
      );
    }

    if (options.minPrice && options.maxPrice)
      query.push(
        (aProduct: ProductInterface) => aProduct.precio > options.minPrice && aProduct.precio < options.maxPrice
      );

    return this.productos.filter(aProduct => query.every(x => x(aProduct)));
  }

  async findProductsOnCart(): Promise<Producto[]> {
    try {
      return this.carrito.productos;
    } catch (err) {
      console.log(err);
    }
  }

  async findProductsOnCartById(idProducto: number): Promise<Producto | undefined> {
    try {
      for (let i in this.carrito.productos) {
        if (this.carrito.productos[i].id == idProducto) {
          return this.carrito.productos[i];
        }
      }
    } catch (err) {
      console.log('Ocurrio un error ' + err);
    }
  }

  async deleteProductsOnCart(idProducto: number): Promise<Producto | undefined> {
    try {
      let producto = await this.findProductsOnCartById(idProducto);
      if (producto) {
        //console.log(producto);
        for (let i = 0; i < this.carrito.productos.length; i++) {
          if (this.carrito.productos[i].id == idProducto) {
            // console.log(this.carrito.productos[i])
            let prods = this.carrito.productos.splice(i, 1);
          }
        }
        return producto;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addProductsToCart(idProducto: number): Promise<ProductInterface | undefined> {
    try {
      let producto = await this.findById(idProducto);
      console.log(producto);
      if (producto) {
        console.log(producto);
        this.carrito.productos.push(producto);
        return producto;
      }
    } catch (err) {
      throw err;
    }
  }
}
