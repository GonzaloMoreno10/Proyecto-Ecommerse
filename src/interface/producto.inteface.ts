export interface newProductInterface {
  nombre: string;
  descripcion:string;
  codigo:number;
  foto:string;
  precio: number;
  stock:number
}

export interface ProductInteface {
  id: string;
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
  get(id?: string | undefined): Promise<ProductInteface[]>;
  add(data: newProductInterface): Promise<ProductInteface>;
  update(id: string, newProductData: ProductInteface): Promise<ProductInteface>;
  delete(id: string): Promise<void>;
  query(options: ProductQueryInterface): Promise<ProductInteface[]>;
}