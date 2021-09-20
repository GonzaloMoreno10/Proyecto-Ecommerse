import { Producto } from "../models";
import { FSRepositorio } from "../DAOs/fs.repository";
import { Request, Response } from "express";
import { productsAPI } from "../apis/productosApi";
import { newProductInterface } from "../interface/producto.inteface";

export class ProductoController {
  async getById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = await productsAPI.getProducts(id);
      if (data) {
        res.status(200).json({ producto: data });
      } else {
        res.status(400).json({ data: "No se encontro el producto" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      let data = await productsAPI.getProducts();
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

  async agregar(req: Request, res: Response) {
    try {
      let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
      let producto: newProductInterface = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
      };
      let result = await productsAPI.addProduct(producto);
      if (result) {
        res.status(200).json({ data: "Producto guardado" });
      } else {
        res.status(500).json({ data: "Algo fallo" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async actualizar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
      let producto: newProductInterface = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
      };

      if (producto) {
        let data = await productsAPI.updateProduct(id, producto);
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
  }

  async borrar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      await productsAPI.deleteProduct(id);
      res.json({
        msg: "producto borrado",
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export const productoController = new ProductoController();
