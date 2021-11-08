import { Request, Response } from 'express';

import { newProductInterface, ProductQueryInterface } from '../interface/producto.inteface';
import { mongoProductRepository } from '../repositories/mongo';

export class ProductoController {
  async getById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = await mongoProductRepository.findById(id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ data: 'No se encontro el producto' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      let data = await mongoProductRepository.findAll();
      if (data) {
        if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ data: 'No existen productos' });
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
      let result = await mongoProductRepository.create(producto);
      if (result) {
        res.status(200).json({ producto: result });
      } else {
        res.status(500).json({ data: 'Algo fallo' });
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
        let prod = await mongoProductRepository.findById(id);
        // console.log(prod);
        if (prod) {
          let data = await mongoProductRepository.update(id, producto);

          res.status(200).json({ producto: 'Producto Actualizado', data });
        } else {
          res.status(500).json({ data: 'No se encontro el producto' });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async vista(req: Request, res: Response) {
    let { minPrice, maxPrice, minStock, maxStock, nombre, codigo } = req.body;
    let options: ProductQueryInterface = { minPrice, maxPrice, minStock, maxStock, nombre, codigo };
    let productos = await mongoProductRepository.query(options);
    res.json(productos);
  }

  async borrar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      await mongoProductRepository.delete(id);
      res.json({
        msg: 'producto borrado',
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export const productoController = new ProductoController();
