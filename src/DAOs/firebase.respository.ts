import mongoose from "mongoose";
import {
  newProductInterface,
  ProductInterface,
  ProductBaseClass,
} from "../interface/producto.inteface";
import admin  from "firebase-admin";
let serviceAccount = require("../config/firebase.json");

export class FirebaseRepository  {
  private db: { doc: () => any; };
  private productos: any;

  constructor(local: boolean = false) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    let con = admin.firestore();
    this.db = con.collection('productos')
  }

  //mongodb+srv://admin:<password>@cluster0.6d6g8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  /*async findAll(): Promise<ProductInterface[]> {
     
  }

  async findById(id: string): Promise<ProductInterface | undefined> {
    try {
     
    } catch (err) {
      
    }
  }*/

  async create(data: newProductInterface): Promise<ProductInterface> {
    try{
        const doc = this.db.doc();
        return await doc.create(data)
    }
    catch(err){
        console.log(err);
    }
  }

  /*async update(
    id: string,
    newProductData: newProductInterface
  ): Promise<ProductInterface> {
    
  }*/

  async delete(id: string) {
    
  }

  /*async query(options: ProductQuery): Promise<ProductInterface[]> {
    let query: ProductQuery = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.precio) query.precio = options.precio;

    return this.productos.find(query);
  }*/
}
