import mongoose from "mongoose";
import {
  newProductInterface,
  ProductInterface,
  ProductBaseClass,
  ProductQueryInterface,
} from "../interface/producto.inteface";
import admin  from "firebase-admin";
import { firebaseConfig } from "./firebase";

export class FirebaseRepository  {
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

  async findById(id:string){
    let res = await this.db.doc(id).get();
    
    return ({
        id:res.id,
        data:res.data()
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

  async query(options: ProductQueryInterface): Promise<ProductInterface[]> {
    let query: ProductQueryInterface = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.codigo) query.codigo = options.codigo;

    let res = await this.db.get(query);
      let docs = res.docs;
      const productos = docs.map(doc=>({
          id:doc.id,
          data:doc.data()
      }))
      console.log(productos);
      return productos;
  }
}
