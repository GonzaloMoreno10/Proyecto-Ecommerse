import fs from "fs/promises";
import path from 'path';
import { Carrito } from "../models/carrito.model";
import { Producto } from "../models/producto.model";
import {productoRepository} from "./producto.repository";

let carritos_ds = path.join(__dirname, '../datasource/carritos.datasource.txt');


 class CarritoRepository {

    //Metodo para leer la info del archivo productos.txt
    async getProductos() {
        let array = [];
        try {
            let data = await fs.readFile(carritos_ds, "utf-8")
            array = data.split("\n");
            let array2 = array.filter(data => data != "");
            if (array2.length > 0) {
                for (let i in array2) {
                    let carrito = (JSON.parse(array2[i]));
                    return carrito;
                }
            }
            else {
                return - 1;
            }
        }
        catch (err) {
            console.log("Ocurrio un error " + err)
        }
    };

    async getProductosById(idProducto:number) {
        try {
            let productos = await this.getProductos();
            console.log(productos)
            if (productos !== -1) {
                for (let i in productos.carrito) {
                    if (productos.carrito[i].idCarrito == idProducto) {
                        return productos.carrito[i]
                    }
                }
            }

            return -1;
        }
        catch (err) {
            console.log("Ocurrio un error " + err)
        }
    }

    async generarIdCarrito() {
        let data = await fs.readFile(carritos_ds, "utf-8");
        let prods = JSON.parse(data);
        return prods.carrito.length;
    };


    async generarId(array:Array<Object>) {
        return array.length;
    }

    async generarCarrito(carrito:Carrito) {

        try {
            await fs.appendFile(carritos_ds, "\n" + JSON.stringify(carrito));
            return 1;
        }
        catch (err) {
            console.log("Ocurrio un error " + err)
        }
    }


    //Metodo utilizado para borrar el archivo
    async borrar(idProducto:number) {
        try {
            let productos = await this.getProductosById(idProducto);
            let carrito = await this.getProductos();
            let prodCarr = carrito.carrito;
            if (productos !== -1) {
                for (let i in prodCarr) {
                    if (prodCarr[i].idCarrito == idProducto) {
                        prodCarr.splice(i, 1)
                        carrito.carrito = prodCarr;
                        await fs.unlink(carritos_ds);
                        await fs.writeFile(carritos_ds, "");

                        break;
                    }
                }
                let data = await this.generarCarrito(carrito);
                if (data == 1) {
                    return productos;
                }
            }
            else {
                return -1;
            }

        }
        catch (err) {
            throw err;
        }

    };


    async guardarProducto(producto:Producto) {
        let actualizada = false;
        try {
            let productos = await productoRepository.getProductosById(producto.id);
            if (productos) {
                let carrito = await this.getProductos();
                if (carrito !== -1) {
                    let carrProds = carrito.carrito;
                    console.log(carrProds)
                    producto.idCarrito = await this.generarIdCarrito();
                    carrProds.push(producto)
                    carrito.carrito = carrProds;
                    actualizada = true;

                    if (actualizada) {
                        await fs.unlink(carritos_ds);
                        await fs.writeFile(carritos_ds, "");
                        await fs.appendFile(carritos_ds, "\n" + JSON.stringify(carrito));
                        return carrito;
                    }
                }

                else {
                    return - 1;
                }
            }
        }

        catch (err) {
            throw err;
        }
    };
}

export const carritoRepositorio = new CarritoRepository();