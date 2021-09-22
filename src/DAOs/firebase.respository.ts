import mongoose from "mongoose";
import {
  newProductInterface,
  ProductInterface,
  PersistanceBaseClass,
  ProductQueryInterface,
} from "../interface/producto.inteface";
import admin  from "firebase-admin";
import { firebaseConfig } from "../../keys/firebase";

export class FirebaseRepository implements PersistanceBaseClass {
  private db: any;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
    let con = admin.firestore();
    this.db = con.collection('productos');
  }

  async findAll(){
      let res = await this.db.get();
      let docs = res.docs;
      const productos = docs.map(doc=>({
          id:doc.id,
          data:doc.data()
      }))
      console.log(productos);
      return productos;
  }

  async findById(id:string):Promise<ProductInterface>{
    let res = await this.db.doc(id).get();
    
    return <ProductInterface><unknown>({
      id: res.id,
      data: res.data()
    });
}   

  async create(data: newProductInterface): Promise<ProductInterface> {
    try{
        const productDocument = this.db.doc();
        return await productDocument.create(data)
    }
    catch(err){
        console.log(err);
    }
  }

  async update(id: string, newProductData: newProductInterface) {
    await this.db.doc(id).update(newProductData);
    return this.findById(id);
  }

  async delete(id: string) {
     return await this.db.doc(id).delete();
  }

  //No llegue
  findProductsOnCart(): Promise<ProductInterface[]> {
    throw new Error("Method not implemented.");
  }
  findProductsOnCartById(id: any): Promise<ProductInterface> {
    throw new Error("Method not implemented.");
  }
  deleteProductsOnCart(id: any): Promise<ProductInterface> {
    throw new Error("Method not implemented.");
  }
  addProductsToCart(idProducto: any): Promise<ProductInterface> {
    throw new Error("Method not implemented.");
  }
  query(options: ProductQueryInterface): Promise<ProductInterface[]> {
    throw new Error("Method not implemented.");
  }
}
