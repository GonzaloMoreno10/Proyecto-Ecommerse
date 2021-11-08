import fs from 'fs/promises';
import path from 'path';
import { PersistanceBaseClass, ProductInterface, ProductQueryInterface } from '../interface/producto.inteface';
import { Carrito } from '../models/carrito.model';
import { Producto } from '../models/producto.model';

let carritos_ds = path.join(__dirname, '../datasource/carritos.datasource.txt');
let productos_ds = path.join(__dirname, '../datasource/productos.datasource.txt');

export class FileSystemRepository implements PersistanceBaseClass {
  //Productos
  async findAll(): Promise<ProductInterface[]> {
    let array = [];
    try {
      let data = await fs.readFile(productos_ds, 'utf-8');
      array = data.split('\n');
      let array2 = array.filter(data => data != '');
      if (array2.length > 0) {
        let productos = array2.map(data => JSON.parse(data));
        return productos;
      }
    } catch (err) {
      console.log('Ocurrio un error ' + err);
    }
    return [];
  }

  async findById(id: any): Promise<ProductInterface | undefined> {
    try {
      let data: Array<ProductInterface>;
      data = await this.findAll();
      if (data) {
        for (let i in data) {
          if (data[i].id == id) {
            return data[i];
          }
        }
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  //Metodo utilizado para guardar un objeto producto
  async create(producto: ProductInterface): Promise<ProductInterface | undefined> {
    let id = await this.generarIdProduct();
    let productos = await this.findAll();
    if (productos) {
      producto.id = id;
      if (producto.nombre) {
        try {
          await fs.appendFile(productos_ds, '\n' + JSON.stringify(producto));
          let productoTeReturn: ProductInterface | undefined = await this.findById(id);
          return productoTeReturn;
        } catch (err) {
          console.log('Ocurrio un error ' + err);
        }
      }
    } else {
      await fs.writeFile(productos_ds, JSON.stringify(producto));
      let productoTeReturn: ProductInterface | undefined = await this.findById(id);
      return productoTeReturn;
    }
  }

  //Metodo utilizado para generar el id
  async generarIdProduct() {
    let array = [];
    let data = await fs.readFile(productos_ds, 'utf-8');
    array = data.split('\n');
    return array.length;
  }

  //Metodo utilizado para borrar el archivo
  async delete(id: number): Promise<void> {
    let i: any;
    try {
      let productos = await this.findAll();
      if (productos) {
        for (i in productos) {
          if (productos[i].id == id) {
            productos.splice(i, 1);
            await fs.unlink(productos_ds);
            await fs.writeFile(productos_ds, '');
          }
        }
      }
      for (let i in productos) {
        await this.create(productos[i]);
      }
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, producto: ProductInterface): Promise<ProductInterface | undefined> {
    let actualizada = 0;
    try {
      let productos = await this.findAll();
      if (productos) {
        for (let i in productos) {
          if (productos[i].id == id) {
            productos[i].nombre = producto.nombre;
            productos[i].descripcion = producto.descripcion;
            productos[i].codigo = producto.codigo;
            productos[i].foto = producto.foto;
            productos[i].precio = producto.precio;
            productos[i].stock = producto.stock;
            //productos[i].timestamp = new Date();
            console.log(productos[i]);
            actualizada = 1;
            break;
          }
        }
        if (actualizada == 1) {
          await fs.unlink(productos_ds);
          await fs.writeFile(productos_ds, '');
          for (let i in productos) {
            await this.create(productos[i]);
          }
          return await this.findById(id);
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async query(options: ProductQueryInterface): Promise<ProductInterface[]> {
    type Conditions = (aProduct: ProductInterface) => boolean;
    const query: Conditions[] = [];

    if (options.nombre) query.push((aProduct: ProductInterface) => aProduct.nombre == options.nombre);

    if (options.codigo) query.push((aProduct: ProductInterface) => aProduct.codigo == options.codigo);

    if (options.minStock && options.maxStock) {
      query.push(
        (aProduct: ProductInterface) => aProduct.stock > options.minStock && aProduct.stock < options.maxStock
      );
    }

    if (options.minPrice && options.maxPrice)
      query.push(
        (aProduct: ProductInterface) => aProduct.precio > options.minPrice && aProduct.precio < options.maxPrice
      );

    return (await this.findAll()).filter(aProduct => query.every(x => x(aProduct)));
  }

  //Metodo para leer la info del archivo productos.txt
  async findProductsOnCart(): Promise<Producto[]> {
    let array = [];
    try {
      let data = await fs.readFile(carritos_ds, 'utf-8');
      array = data.split('\n');
      let array2 = array.filter(data => data != '');
      if (array2.length > 0) {
        for (let i in array2) {
          let carrito = JSON.parse(array2[i]);
          return carrito.productos;
        }
      } else {
        return [];
      }
    } catch (err) {
      console.log('Ocurrio un error ' + err);
    }
    return [];
  }

  async findCarrito(): Promise<Carrito> {
    let carrito: Carrito = new Carrito(0, new Date(), []);
    try {
      let data = await fs.readFile(carritos_ds, 'utf-8');
      let array = data.split('\n');
      let array2 = array.filter(data => data != '');
      for (let i in array2) {
        carrito = JSON.parse(array2[i]);
      }
    } catch (err) {
      console.log('Ocurrio un error ' + err);
    }
    return carrito;
  }

  async findProductsOnCartById(idProducto: number): Promise<Producto | undefined> {
    try {
      let producto = await this.findAll();
      if (producto) {
        for (let i in producto) {
          if (producto[i].idCarrito == idProducto) {
            return producto[i];
          }
        }
      }
    } catch (err) {
      console.log('Ocurrio un error ' + err);
    }
  }

  async generarIdCarrito() {
    let data = await fs.readFile(carritos_ds, 'utf-8');
    let carrito = JSON.parse(data);
    return carrito.productos.length;
  }

  async generarId(array: Array<Object>) {
    return array.length;
  }

  async generarCarrito(carrito: Carrito) {
    try {
      await fs.appendFile(carritos_ds, '\n' + JSON.stringify(carrito));
      return 1;
    } catch (err) {
      console.log('Ocurrio un error ' + err);
    }
  }

  //Metodo utilizado para borrar el archivo
  async deleteProductsOnCart(idProducto: number): Promise<Producto | undefined> {
    try {
      let carrito = await this.findCarrito();
      let producto = await this.findById(idProducto);
      let productos = await this.findAll();
      if (productos) {
        for (let i in productos) {
          if (productos[i].idCarrito == idProducto) {
            productos.splice(parseInt(i), 1);
            carrito.productos = productos;
            //carrito.carrito = prodCarr;
            await fs.unlink(carritos_ds);
            await fs.writeFile(carritos_ds, '');

            break;
          }
        }
        let data = await this.generarCarrito(carrito);
        if (data == 1) {
          return producto;
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async addProductsToCart(producto: Producto): Promise<Producto | undefined> {
    let actualizada = false;
    try {
      let carrito = await this.findCarrito();
      if (carrito) {
        let carrProds = carrito.productos;
        producto.idCarrito = await this.generarIdCarrito();
        carrProds.push(producto);
        carrito.productos = carrProds;
        actualizada = true;
        if (actualizada) {
          await fs.unlink(carritos_ds);
          await fs.writeFile(carritos_ds, '');
          await fs.appendFile(carritos_ds, '\n' + JSON.stringify(carrito));
          return producto;
        }
      }
    } catch (err) {
      throw err;
    }
  }
}

export const FSRepositorio = new FileSystemRepository();
