export interface newProductInterface {
  nombre: string;
  descripcion:string;
  codigo:number;
  foto:string;
  precio: number;
  stock:number
}

export interface ProductInterface {
  id: any;
  nombre: string;
  descripcion:string;
  codigo:number;
  foto:string;
  precio: number;
  stock:number
}

export interface ProductQueryInterface {
  nombre?: string;
  precio?: number;
}

export interface ProductBaseClass {
  findAll(): Promise<ProductInterface[]>;
  findById(id:any): Promise<ProductInterface>;
  create(data: newProductInterface): Promise<ProductInterface>;
  update(id: any, newProductData: ProductInterface): Promise<ProductInterface>;
  delete(id: any): Promise<void>;
  //query(options: ProductQueryInterface): Promise<ProductInteface[]>;
}