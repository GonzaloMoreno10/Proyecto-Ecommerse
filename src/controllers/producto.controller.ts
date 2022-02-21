import { Request, Response } from 'express';
import { newProductInterface } from '../interface/producto.inteface';
import { mongoProductRepository } from '../repositories/mongo';
import { categoriaRepository } from '../repositories/mongo/categoria.repository';
import { ProductQueryInterface } from '../interface';

export class ProductoController {
  async getById(req: Request, res: Response) {
    try {
      let { id } = req.params;
      if (id) {
        let product = await mongoProductRepository.findById(id);
        product ? res.json(product) : res.status(404).json('Product not found');
      } else {
        res.status(400).json('Invalid Field: ID');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findByCategoria(req: Request, res: Response) {
    let { categoriaId } = req.params;
    try {
      if (categoriaId) {
        const productos = await mongoProductRepository.findByCategory(categoriaId);

        return res.status(200).json(productos);
      } else {
        return res.status(400).json('Invalid params');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { categoria, nombre, minPrice, maxPrice, codigo, minStock, maxStock } = req.query;
      const query: ProductQueryInterface = {};
      if (nombre) query.nombre = nombre.toString();
      if (codigo) query.codigo = Number(codigo);
      if (minPrice) query.minPrice = Number(minPrice);
      if (maxPrice) query.maxPrice = Number(maxPrice);
      if (minStock) query.minStock = Number(minStock);
      if (maxStock) query.maxStock = Number(maxStock);
      if (categoria) query.categoria = categoria.toString();
      let data = await mongoProductRepository.query(query);
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

      let cat = await categoriaRepository.getCategoriasById(categoria.toString());
      if (cat) {
        let result = await mongoProductRepository.create(producto);
        return res.status(200).json(result);
      } else {
        res.status(400).json('Categoria no existente');
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
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

      console.log('Entre en editar');

      let prod = await mongoProductRepository.findById(id);
      if (prod) {
        let data = await mongoProductRepository.update(id, producto);
        let productToRes = await mongoProductRepository.findById(id);
        res.status(200).json({ result: 'Producto Actualizado', productToRes });
      } else {
        res.status(400).json('Producto no encontrado');
      }
    } catch (err) {
      return res.json(err);
    }
  }

  async borrar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let prod = await mongoProductRepository.findById(id);
      if (prod) {
        await mongoProductRepository.delete(id);
        res.status(202).json({
          msg: 'producto borrado',
        });
      } else {
        res.status(400).json('Producto no encontrado');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const productoController = new ProductoController();
