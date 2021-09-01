import express from "express";
import { check } from "../middlewares/check";
import { Producto } from "../models";
import {productoRepository} from "../repositorios";
import {Request,Response } from "express";

class ProductoController{
  async getById(req:Request,res:Response){
    try {
      let id:number =parseInt(req.params.id) ;
      let data = await productoRepository.getProductosById(id);
      if (data) {
        res.status(200).json({ producto: data });
      } else {
        res.status(400).json({ data: "No se encontro el producto" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  async get(req:Request,res:Response){
    try {
      let data = await productoRepository.getProductos();
      if (data) {
        if (data.length > 0) {
          res.status(200).json({ producto: data });
        } else {
          res.status(400).json({ data: "No existen productos" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req:Request,res:Response){
    try {
      let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
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
      let result = await productoRepository.guardar(producto);
      if (result == 1) {
        res.status(200).json({ data: "Producto guardado" });
      } else {
        res.status(500).json({ data: "Algo fallo" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async actualizar(req:Request,res:Response){
    try {
      let id = parseInt(req.params.id);
      let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
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
        let data = await productoRepository.actualizar(id, producto);
        if (data) {
          res.status(200).json({ producto: "Producto Actualizado", data });
        } else {
          res.status(500).json({ data: "No se encontro el producto" });
        }
      } else {
        res.status(400).json({ data: "No se encontro el producto" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  async borrar(req:Request,res:Response){
    try {
      let id:number = parseInt(req.params.id);
      let producto = await productoRepository.getProductosById(id);
      let data = await productoRepository.borrar(id);
      if (data) {
        res.status(200).json({ data: "Producto Eliminado", producto });
      } else {
        res.status(500).json({ data: "No se encontro el producto" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const productoController = new ProductoController();
