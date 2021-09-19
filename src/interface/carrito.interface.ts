import { Producto } from "../models";

export interface CarritoPersistanceInterface {
    findAll():Promise<any|undefined>

    findById(id:number):any;

    create(product:Producto):Promise<Producto|undefined>;

    delete(id:number):Promise<Producto|undefined>;
  }