import express from "express";
import { Producto } from "../models/producto.model";
import {CarritoRepository,ProductoRepository} from "../repositorios";
import{check} from '../middlewares/check';
const Router = express.Router();

//qwdqwdasdw

let carritoRepo = new CarritoRepository();
let prodRepo = new ProductoRepository();

Router.get("/listar/:idProducto?" ,async (request, response) => {
  try {
    if (request.params.idProducto) {
      let idProducto: number = parseInt(request.params.idProducto);
      let data = await carritoRepo.getProductosById(idProducto);
      if (data !== -1) {
        response.status(200).json({ data: data });
      } else {
        response.status(400).json({ data: "No se encontro el producto" });
      }
    } else {
      let productos = await carritoRepo.getProductos();
      if (productos !== -1) {
        response.status(200).json({ producto: productos.carrito });
      } else {
        response.status(400).json({ Producto: "No se encontro el producto" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

Router.post("/agregar/:idProd", async (request, response) => {
  try {
    let idProd: number = parseInt(request.params.idProd);
    let prod: Producto | undefined = await prodRepo.getProductosById(idProd);
    if (prod) {
      let data = await carritoRepo.guardarProducto(prod);
      if (data !== -1) {
        response.status(200).json({ data: data });
      } else {
        response.status(400).json({ data: "Ocurrio un error" });
      }
    } else {
      response.status(400).json({ data: "El producto no existe" });
    }
  } catch (err) {
    console.log(err);
  }
});

Router.delete("/borrar/:idProducto", async (request, response) => {
  let idProducto: number = parseInt(request.params.idProducto);
  try {
    let data = await carritoRepo.borrar(idProducto);
    if (data !== -1) {
      response.status(200).json({ data: data });
    } else {
      response.status(400).json({ data: "No se encontro el producto" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default Router;
