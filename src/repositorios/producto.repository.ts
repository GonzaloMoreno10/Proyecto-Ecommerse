import fs from "fs/promises";
import path from "path";
import { Producto } from "../models/producto.model";

let productos_ds = path.join(
  __dirname,
  "../datasource/productos.datasource.txt"
);

class ProductoRepository {
  //Metodo para leer la info del archivo productos.txt
  async getProductos(): Promise<Producto[]> {
    let array = [];
    try {
      let data = await fs.readFile(productos_ds, "utf-8");
      array = data.split("\n");
      let array2 = array.filter((data) => data != "");
      if (array2.length > 0) {
        let productos = array2.map((data) => JSON.parse(data));
        return productos;
      }
    } catch (err) {
      console.log("Ocurrio un error " + err);
    }
    return [];
  }
  getProductosById = async (id: number): Promise<Producto | undefined> => {
    try {
      let data: Array<Producto>;
      data = await this.getProductos();
      if (data) {
        for (let i in data) {
          if (data[i].id == id) {
            return data[i];
          }
        }
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  //Metodo utilizado para guardar un objeto producto
  async guardar(producto: Producto) {
    let id = await this.generarId();
    let productos = await this.getProductos();
    if (productos) {
      producto.id = id;
      if (producto.nombre) {
        try {
          await fs.appendFile(productos_ds, "\n" + JSON.stringify(producto));
          return 1;
        } catch (err) {
          console.log("Ocurrio un error " + err);
        }
      }
    } else {
      await fs.writeFile(productos_ds, JSON.stringify(producto));
      return 1;
    }
  }

  //Metodo utilizado para generar el id
  async generarId() {
    let array = [];
    let data = await fs.readFile(productos_ds, "utf-8");
    array = data.split("\n");
    return array.length;
  }

  //Metodo utilizado para borrar el archivo
  async borrar(id: number): Promise<number> {
    let prod: Producto;
    let i: any;
    try {
      let productos: Array<Producto> = await this.getProductos();
      if (productos) {
        for (i in productos) {
          if (productos[i].id == id) {
            productos.splice(i, 1);
            await fs.unlink(productos_ds);
            await fs.writeFile(productos_ds, "");
            for (let i in productos) {
              await this.guardar(productos[i]);
            }
            return 1;
          }
        }
      }
    } catch (err) {
      throw err;
    }
    return -1;
  }

  async actualizar(id: number, producto: Producto) {
    let actualizada = 0;
    try {
      let productos = await this.getProductos();
      if (productos) {
        for (let i in productos) {
          if (productos[i].id == id) {
            productos[i].nombre = producto.nombre;
            productos[i].descripcion = producto.descripcion;
            productos[i].codigo = producto.codigo;
            productos[i].foto = producto.foto;
            productos[i].precio = producto.precio;
            productos[i].stock = producto.stock;
            productos[i].timestamp = new Date();
            console.log(productos[i]);
            actualizada = 1;
            break;
          }
        }
        if (actualizada == 1) {
          await fs.unlink(productos_ds);
          await fs.writeFile(productos_ds, "");
          for (let i in productos) {
            await this.guardar(productos[i]);
          }
          return await this.getProductosById(id);
        }
      }
    } catch (err) {
      throw err;
    }
  }
}

export const productoRepository = new ProductoRepository();