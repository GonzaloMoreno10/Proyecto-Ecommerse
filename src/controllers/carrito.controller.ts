import express from "express";
import { Producto } from "../models/producto.model";
import { MySqlProductoRepository } from "../DAOs/mySql.repository";
import { NextFunction, Request, Response } from "express";
import { check } from '../middlewares/check';
const Router = express.Router();
import { api } from '../apis/api'

class CarritoController {
  async findById(req: Request, res: Response) {
    try {
      if (req.params.idProducto) {
        let idProducto = req.params.idProducto;
        let data = await api.find(idProducto);
        if (data) {
          res.json(data);
        } else {
          res.status(400).json({ data: "No se encontro el producto" });
        }
      } else {
        let productos = await api.find();
        let total = 0;
        for(let i in productos){
          total += productos[i].precio
        }
        if (productos) {
          res.json(productos);
        } else {
          res.status(400).json({ Producto: "No se encontro el producto" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req: Request, res: Response) {
    try {
      console.log("Entre en post carrito")
      let idProd = req.params.idProd;
      let existInCart = await api.find(idProd);
      let existsProd = await api.getProducts(idProd);
      if (existsProd) {
        if (!existInCart) {
          await api.add(idProd);
          res.json(1)
        } else {
          res.status(203).json(-1);
        }
      }
      else {
        res.status(400).json(-2);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req: Request, res: Response) {
    let idProducto = req.params.idProducto;
    try {
      let prod = await api.find(idProducto);
      if (prod) {
        await api.delete(idProducto);
        res.json('Producto removido del carrito')
      }
      else {
        res.json({ data: "Producto no existente en el carrito" })
      }
    }
    catch (err) {
      console.log(err);
    }
  }

}

export const carritoController = new CarritoController();
