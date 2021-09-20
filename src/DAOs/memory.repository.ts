import {
    newProductInterface,
    ProductInterface,
    ProductBaseClass,
  } from '../interface/producto.inteface';
  
  export class ProdMemoriaRepository implements ProductBaseClass {
    private productos: ProductInterface[] = [];
  
    constructor() {
      const mockData = [
        { id: '1', nombre: 'lapiz',codigo:1,foto:'',descripcion:'',precio:100,stock:10 },
        { id: '2', nombre: 'cartuchera',codigo:1,foto:'',descripcion:'',precio:100,stock:10 },
        { id: '3', nombre: 'boligoma',codigo:1,foto:'',descripcion:'',precio:100,stock:10},
      ];
  
      mockData.forEach((aMock) => this.productos.push(aMock));
    }
  
    findIndex(id: string) {
      return this.productos.findIndex((aProduct) => aProduct.id == id);
    }
  
    async findAll(): Promise<ProductInterface[] | undefined >{
      return this.productos;
    }
  
    async findById(id: any): Promise<ProductInterface> {
        for(let i in this.productos){
            if(this.productos[i].id === id){
                return this.productos[i];
            }
        }
    }
  
    async create(data: newProductInterface): Promise<ProductInterface> {
      if (!data.nombre || !data.precio) throw new Error('invalid data');
  
      const newItem: ProductInterface = {
        id: (this.productos.length + 1).toString(),
        nombre: data.nombre,
        precio: data.precio,
        stock:data.stock,
        codigo:data.codigo,
        foto:data.foto,
        descripcion:data.descripcion
      };
  
      this.productos.push(newItem);
  
      return newItem;
    }
  
    async update(id: string, newProductData: newProductInterface): Promise<ProductInterface> {
      const index = this.findIndex(id);
      const oldProduct = this.productos[index];
  
      const updatedProduct: ProductInterface = { ...oldProduct, ...newProductData };
      this.productos.splice(index, 1, updatedProduct);
      return updatedProduct;
    }
  
    async delete(id: string): Promise<void> {
      const index = this.findIndex(id);
      this.productos.splice(index, 1);
    }
  
   /* async query(options: ProductQuery): Promise<ProductInterface[]> {
      type Conditions = (aProduct: ProductInterface) => boolean;
      const query: Conditions[] = [];
  
      if (options.nombre)
        query.push((aProduct: ProductI) => aProduct.nombre == options.nombre);
  
      if (options.precio)
        query.push((aProduct: ProductI) => aProduct.precio == options.precio);
  
      return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
    }*/
  }
  