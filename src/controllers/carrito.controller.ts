import express from "express";
import { Producto } from "../models/producto.model";
import {MySqlProductoRepository} from "../DAOs/mySql.repository";
import { NextFunction,Request,Response } from "express";
import{check} from '../middlewares/check';
const Router = express.Router();
import {api} from '../apis/api'

class CarritoController{
  async findById(req:Request,res:Response){
    try {
      console.log('entre al controlador de carrito')
      if (req.params.idProducto) {
        let idProducto = req.params.idProducto;
        let data = await api.find(idProducto);
        if (data) {
          res.status(200).json({ data: data });
        } else {
          res.status(400).json({ data: "No se encontro el producto" });
        }
      } else {
        let productos = await api.find();
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
      let idProd = req.params.idProd;
      //let prod = await carritoRepo.findProductsOnCartById(idProd);
      if (idProd) {
        let data = await api.add(idProd);
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
    let idProducto = req.params.idProducto;
  try {
    let data = await api.delete(idProducto);
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
