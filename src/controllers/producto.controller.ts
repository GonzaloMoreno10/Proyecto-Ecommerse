import { Request, Response } from 'express';

import { newProductInterface, ProductQueryInterface } from '../interface/producto.inteface';
import { mongoProductRepository } from '../repositories/mongo';

export class ProductoController {
  async getById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let product = await mongoProductRepository.findById(id);
      res.json(product);
    } catch (err) {
      console.log(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      let data = await mongoProductRepository.findAll();
      console.log(data);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req: Request, res: Response) {
    try {
      let { nombre, descripcion, codigo, foto, precio, stock, categoria } = req.body;
      let producto: newProductInterface = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria,
      };
      let result = await mongoProductRepository.create(producto);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async actualizar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let { nombre, descripcion, codigo, foto, precio, stock, categoria } = req.body;
      let producto: newProductInterface = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria,
      };

      if (producto) {
        let prod = await mongoProductRepository.findById(id);
        let data = await mongoProductRepository.update(id, producto);
        res.status(200).json({ producto: 'Producto Actualizado', data });
      }
    } catch (err) {
      return res.json(err);
    }
  }

  async borrar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      await mongoProductRepository.delete(id);
      res.status(202).json({
        msg: 'producto borrado',
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export const productoController = new ProductoController();
