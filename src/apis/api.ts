import { newProductInterface, ProductInterface, ProductQueryInterface } from '../interface/producto.inteface';
import { ProductFactoryDAO } from '../config/DAOs.factory';
import { tipoPersistencias } from '../constantes/persistencias';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = tipoPersistencias.FIREBASE;

class Api {
  private productos;
  private carrito: any;

  constructor() {
    this.productos = ProductFactoryDAO.get(tipo);
  }

  async getProducts(id: any | undefined = undefined): Promise<ProductInterface[]> {
    if (id){
        return this.productos.findById(id);
    }
    return this.productos.findAll();
  }

  async addProduct(productData: newProductInterface): Promise<ProductInterface> {
      console.log(productData)
    const newProduct = await this.productos.create(productData)
    return newProduct;
  }

  async updateProduct(id: any, productData: newProductInterface) {
    await this.productos.update(id,productData);
    return productData;
  }

  async deleteProduct(id: any) {
    await this.productos.delete(id);
  }

  async query(options: ProductQueryInterface) {
    return await this.productos.query(options);
  }

  async find(id?: any) {
    if (id) {
      return this.carrito.findProductsOnCartById(id);
    }
    return this.carrito.findProductsOnCart();
  }

  async add(idProducto: any) {
    return this.carrito.addProductsToCart(idProducto);
  }

  async delete(idProducto: any) {
    return this.carrito.deleteProductsOnCart(idProducto);
  }
}

export const api = new Api();
