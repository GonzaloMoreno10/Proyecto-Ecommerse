import mongoose from "mongoose";
import {
  newProductInterface,
  ProductInterface,
  PersistanceBaseClass,
  ProductQueryInterface,
} from "../interface/producto.inteface";
import admin from "firebase-admin";
import { firebaseConfig } from "../../keys/firebase";

export class FirebaseRepository implements PersistanceBaseClass {
  private productos: any;
  private carritos: any;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
    let con = admin.firestore();
    this.productos = con.collection("productos");
    this.carritos = con.collection("carritos");
  }

  async findAll() {
    let res = await this.productos.get();
    let docs = res.docs;
    const productos = docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    //console.log(productos);
    return productos;
  }

  async findById(id: string): Promise<ProductInterface> {
    let res = await this.productos.doc(id).get();

    return <ProductInterface>(<unknown>{
      id: res.id,
      data: res.data(),
    });
  }

  async create(data: newProductInterface): Promise<ProductInterface> {
    try {
      const productDocument = this.productos.doc();
      return await productDocument.create(data);
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string, newProductData: newProductInterface) {
    await this.productos.doc(id).update(newProductData);
    return this.findById(id);
  }

  async delete(id: string) {
    return await this.productos.doc(id).delete();
  }


  async findProductsOnCart(): Promise<ProductInterface[]> {
    let res = await this.carritos.get();
    let docs = res.docs;
    const carrito = docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return carrito[0].data.productos;
  }
  async findProductsOnCartById(id: any): Promise<ProductInterface> {
    let res = await this.carritos.get();
    let docs = res.docs;
    const carrito = docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    let cart = carrito[0].data.productos;
    for (let i in cart) {
      if (cart[i].id === id) {
        return cart[i];
      }
    }
  }
  deleteProductsOnCart(id: any): Promise<ProductInterface> {
    throw new Error("Method not implemented.");
  }
  async addProductsToCart(idProducto: any): Promise<ProductInterface> {
    throw new Error("Method not implemented.");
  }
  query(options: ProductQueryInterface): Promise<ProductInterface[]> {
    throw new Error("Method not implemented.");
  }
}
