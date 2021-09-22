import { newProductInterface, ProductInterface, ProductQueryInterface } from '../interface/producto.inteface';
import { ProductFactoryDAO } from '../config/DAOs.factory';
import { tipoPersistencias } from '../constantes/persistencias';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = tipoPersistencias.FIREBASE;

class Api {
  private persistance;

  constructor() {
    this.persistance = ProductFactoryDAO.get(tipo);
  }

  async getProducts(id: any | undefined = undefined): Promise<ProductInterface[]> {
    if (id){
        return this.persistance.findById(id);
    }
    return this.persistance.findAll();
  }

  async addProduct(productData: newProductInterface): Promise<ProductInterface> {
      console.log(productData)
    const newProduct = await this.persistance.create(productData)
    return newProduct;
  }

  async updateProduct(id: any, productData: newProductInterface) {
    await this.persistance.update(id,productData);
    return productData;
  }

  async deleteProduct(id: any) {
    await this.persistance.delete(id);
  }

  async query(options: ProductQueryInterface) {
    return await this.persistance.query(options);
  }

  async find(id?: any) {
    if (id) {
      return this.persistance.findProductsOnCartById(id);
    }
    return this.persistance.findProductsOnCart();
  }

  async add(idProducto: any) {
    return this.persistance.addProductsToCart(idProducto);
  }

  async delete(idProducto: any) {
    return this.persistance.deleteProductsOnCart(idProducto);
  }
}

export const api = new Api();
