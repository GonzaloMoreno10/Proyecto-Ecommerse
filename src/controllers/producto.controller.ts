import { Request, Response } from 'express';
import { IProduct } from '../interface/producto.inteface';
import { categoriaRepository } from '../repositories/mongo/categoria.repository';
import { ProductQueryInterface } from '../interface';
import { mysqlProductRepository } from '../repositories/mysql/productRepository';

export class ProductoController {
  async getRelatedProduct(req: Request, res: Response) {
    try {
      const { id, categoria, marca, productType } = req.query;
      const result = await mysqlProductRepository.getRelatedProducts(
        Number(id),
        Number(categoria),
        Number(marca),
        Number(productType)
      );
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  async getById(req: Request, res: Response) {
    try {
      let { id } = req.params;
      if (id) {
        let product = await mysqlProductRepository.getProductsById(parseInt(id));
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
        const productos = await mysqlProductRepository.getProductsQuery({ categoria: categoriaId });

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
      const { categoria, nombre, minPrice, maxPrice, codigo, minStock, maxStock, marca, productType } = req.query;
      const query: ProductQueryInterface = {};
      if (nombre) query.nombre = nombre.toString();
      if (codigo) query.codigo = Number(codigo);
      if (minPrice) query.minPrice = Number(minPrice);
      if (maxPrice) query.maxPrice = Number(maxPrice);
      if (minStock) query.minStock = Number(minStock);
      if (maxStock) query.maxStock = Number(maxStock);
      if (categoria) query.categoria = categoria.toString();
      if (marca) query.marca = Number(marca);
      if (productType) query.productType = Number(marca);
      let data = await mysqlProductRepository.getProductsQuery(query);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req: Request, res: Response) {
    try {
      let { nombre, descripcion, codigo, foto, precio, stock, categoria, productType, marca } = req.body;
      let producto: IProduct = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria,
        productTypeId: productType,
        marcaId: marca,
      };

      //let cat = await categoriaRepository.getCategoriasById(categoria);
      //if (cat) {
      let result = await mysqlProductRepository.setProduct(producto);
      if (result) {
        const producto: IProduct = await mysqlProductRepository.getProductsById(result);
        return res.status(200).json(producto);
      }

      // } else {
      //res.status(400).json('Categoria no existente');
      //}
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async actualizar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let { nombre, descripcion, codigo, foto, precio, stock, categoria, productType, marca } = req.body;
      let producto: IProduct = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria,
        productTypeId: productType,
        marcaId: marca,
      };

      let prod = await mysqlProductRepository.getProductsById(parseInt(id));
      if (prod) {
        let data = await mysqlProductRepository.updateProduct(producto, parseInt(id));
        let productToRes = await mysqlProductRepository.getProductsById(parseInt(id));
        res.status(200).json({ result: 'Producto Actualizado', productToRes });
      } else {
        res.status(400).json('Producto no encontrado');
      }
    } catch (err) {
      return res.json(err);
    }
  }

  async find(req: Request, res: Response) {
    const { search } = req.params;
    try {
      const products = await mysqlProductRepository.findByKeyWord(search);
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
    }
  }

  async borrar(req: Request, res: Response) {
    try {
      let id = parseInt(req.params.id);
      let prod = await mysqlProductRepository.getProductsById(id);
      if (prod) {
        await mysqlProductRepository.deleteProduct(id);
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
