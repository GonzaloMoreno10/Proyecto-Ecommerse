export interface IProduct {
  id?: number;
  properties?: IProperty[];
  nombre: string;
  descripcion: string;
  codigo: number;
  foto: string;
  precio: number;
  stock: number;
  categoria: string;
  productTypeId: number;
  marcaId: number;
}

export interface ISubProperty {
  subProperty: string;
  value: string;
}

export interface IProperty {
  propertyId: number;
  isGeneric: number;
  propertyName: string;
  subProperties: ISubProperty[];
}

export interface ProductInterface {
  _id: any;
  nombre: string;
  descripcion: string;
  codigo: number;
  foto: string;
  precio: number;
  stock: number;
  categoria: string;
}

export interface ProductOnCart extends ProductInterface {
  cantidad: number;
  precioTotal: number;
}

export interface ProductQueryInterface {
  nombre?: string;
  codigo?: number;
  minStock?: number;
  maxStock?: number;
  minPrice?: number;
  maxPrice?: number;
  categoria?: string;
  marca?: number;
  productType?: number;
}

export interface PersistanceBaseClass {
  findAll(): Promise<ProductInterface[]>;
  findById(id: any): Promise<ProductInterface>;
  create(data: IProduct): Promise<ProductInterface>;
  update(id: any, newProductData: ProductInterface): Promise<ProductInterface>;
  delete(id: any): Promise<void>;
  query(options: ProductQueryInterface): Promise<ProductInterface[]>;
  findProductsOnCart(): Promise<ProductInterface[]>;
  findProductsOnCartById(id: any): Promise<ProductInterface>;
  deleteProductsOnCart(id: any): Promise<ProductInterface>;
  addProductsToCart(idProducto: any): Promise<ProductInterface>;
}
