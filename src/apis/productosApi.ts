import { newProductInterface, ProductInterface } from '../interface/producto.inteface';
import { ProductFactoryDAO } from '../config/DAOs.factory';
import { tipoPersistencias } from '../constantes/persistencias';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = tipoPersistencias.FIREBASE;

class prodAPI {
  private productos;

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

  /*async query(options: ProductQuery) {
    return await this.productos.query(options);
  }*/
}

export const productsAPI = new prodAPI();
