import { newProductInterface, ProductInterface, ProductQueryInterface } from '../interface/producto.inteface';
import { ProductFactoryDAO } from '../config/DAOs.factory';
import { tipoPersistencias } from '../constantes/persistencias';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = tipoPersistencias.MONGO_ATLAS;

class Api {
  private persistance;

  constructor() {
    this.persistance = ProductFactoryDAO.get(tipo);
  }

  async getProducts(id: any | undefined = undefined): Promise<ProductInterface[]> {
    console.log(id);
    if (id){
        return this.persistance.findById(id);
    }
    return this.persistance.findAll();
  }

  async addProduct(productData: newProductInterface): Promise<ProductInterface> {
      //console.log(productData)
    const newProduct = await this.persistance.create(productData)
    return newProduct;
  }

  async updateProduct(id: any, productData: newProductInterface) {
    try{
      await this.persistance.update(id,productData);
      return productData;
    }
    catch(err){
      console.log(err);
    }
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
    let result = await  this.persistance.addProductsToCart(idProducto);
    if(result == -1){
      return "El producto ya se encuentra en el carrito"
    }
    if(result == -2){
      return "El producto a agregar no existe o no esta disponible"
    }
    return result;
  }

  async delete(idProducto: any) {
    return this.persistance.deleteProductsOnCart(idProducto);
  }

  async getUsers(id:any){
    if(id){
      return await this.persistance.getUsersById(id)
    }
    else{
      return await this.persistance.getUsers();
    }
  }
}

export const api = new Api();
