/*import express from "express";
import { Producto } from "../models/producto.model";
import {FScarritoRepositorio,FSproductoRepository} from "../repositorios";
import { NextFunction,Request,Response } from "express";
import{check} from '../middlewares/check';
const Router = express.Router();

class CarritoController{
  async findById(req:Request,res:Response){
    try {
      if (req.params.idProducto) {
        let idProducto: number = parseInt(req.params.idProducto);
        let data = await FScarritoRepositorio.findById(idProducto);
        if (data) {
          res.status(200).json({ data: data });
        } else {
          res.status(400).json({ data: "No se encontro el producto" });
        }
      } else {
        let productos = await FScarritoRepositorio.findAll();
        if (productos) {
          res.status(200).json({ producto: productos});
        } else {
          res.status(400).json({ Producto: "No se encontro el producto" });
        }
      }
    } catch (err) {
      console.log(err);
    }     
  }

  async agregar(req:Request,res:Response){
    try {
      let idProd: number = parseInt(req.params.idProd);
      let prod: Producto | undefined = await FSproductoRepository.findById(idProd);
      if (prod) {
        let data = await FScarritoRepositorio.create(prod);
        if (data) {
          res.status(200).json({ data: data });
        } else {
          res.status(400).json({ data: "Ocurrio un error" });
        }
      } else {
        res.status(400).json({ data: "El producto no existe" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req:Request,res:Response){
    let idProducto: number = parseInt(req.params.idProducto);
  try {
    let data = await FScarritoRepositorio.delete(idProducto);
    if (data) {
      res.status(200).json({ data: data });
    } else {
      res.status(400).json({ data: "No se encontro el producto" });
    }
  } catch (err) {
    console.log(err);
  }
  }
}


export const carritoController = new CarritoController();
*/