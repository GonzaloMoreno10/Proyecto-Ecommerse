import express from "express";
import { check } from "../middlewares/check";
import { Producto } from "../models";
import {ProductoRepository} from "../repositorios";
const Router = express.Router();
let prodRepo = new ProductoRepository();

Router.get("/listar/:id", async (request, response) => {
  try {
    let id:number =parseInt(request.params.id) ;
    let data = await prodRepo.getProductosById(id);
    if (data) {
      response.status(200).json({ producto: data });
    } else {
      response.status(400).json({ data: "No se encontro el producto" });
    }
  } catch (err) {
    console.log(err);
  }
});

Router.get("/listar", async (request, response) => {
  try {
    let data = await prodRepo.getProductos();
    if (data) {
      if (data.length > 0) {
        response.status(200).json({ producto: data });
      } else {
        response.status(400).json({ data: "No existen productos" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

Router.post("/agregar",check, async (request, response) => {
  try {
    let { nombre, descripcion, codigo, foto, precio, stock } = request.body;
    let producto = new Producto(
      0,
      new Date(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
      undefined
    );
    let result = await prodRepo.guardar(producto);
    if (result == 1) {
      response.status(200).json({ data: "Producto guardado" });
    } else {
      response.status(500).json({ data: "Algo fallo" });
    }
  } catch (err) {
    console.log(err);
  }
});

Router.put("/actualizar/:id",check, async (request, response) => {
  try {
    let id = parseInt(request.params.id);
    let { nombre, descripcion, codigo, foto, precio, stock } = request.body;
    let producto = new Producto(
      id,
      new Date(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
      undefined
    );
    if (producto) {
      let data = await prodRepo.actualizar(id, producto);
      if (data) {
        response.status(200).json({ producto: "Producto Actualizado", data });
      } else {
        response.status(500).json({ data: "No se encontro el producto" });
      }
    } else {
      response.status(400).json({ data: "No se encontro el producto" });
    }
  } catch (err) {
    console.log(err);
  }
});

Router.delete("/borrar/:id", check,async (request, response) => {
  try {
    let id:number = parseInt(request.params.id);
    let producto = await prodRepo.getProductosById(id);
    let data = await prodRepo.borrar(id);
    if (data) {
      response.status(200).json({ data: "Producto Eliminado", producto });
    } else {
      response.status(500).json({ data: "No se encontro el producto" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default Router;
