import { Request, Response } from 'express';
import { API_URL } from '../constants/venv';
import { INewProduct, IProduct, IProductRelations } from '../interface/product.interface';
import { productRepository } from '../repositories/product.repository';
import { constructResponse } from '../utils/constructResponse';

export class ProductoController {
  async getRelated(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const result = await productRepository.getByRelated(Number(id));
      return constructResponse(122, res, result);
    } catch (err) {
      console.log(err);
      return res.status(200).json(constructResponse(200, null, err));
    }
  }

  async getByOrderUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await productRepository.getByLastOrderUser(parseInt(userId));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async getOffers(req: Request, res: Response) {
    try {
      const result = await productRepository.getInOffer();
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const query: string = <string>req.query.fields;
      let fields = [];
      if (query) {
        fields = query.split(',');
      }

      let product = await productRepository.getById(parseInt(id), fields.length > 0 ? fields : undefined);
      if (product) {
        return constructResponse(121, res, product);
      } else {
        return constructResponse(123, res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { pageSize, page } = req.query;
      if (pageSize && page) {
        let nextPage: string = '';
        const limit: number = Number(pageSize || 10);
        const offset: number = Number(page || 0) * limit;
        const products = await productRepository.get(limit, offset);
        if (products.length > 0) {
          const quantity = await productRepository.count();
          const nextPageProds = await productRepository.get(limit, offset + 1);
          if (nextPageProds.length > 0) {
            nextPage = `${API_URL}/products?pageSize=${pageSize}&page=${Number(page) + 1}`;
          }
          return constructResponse(121, res, {
            quantity,
            page: Number(page),
            perPage: Number(pageSize),
            nextPage: nextPage ? nextPage : null,
            products,
          });
        }
        return constructResponse(123, res);
      } else {
        return constructResponse(121, res, await productRepository.get(10, 0));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(_, res: Response) {
    try {
      const product: INewProduct = res.locals.newProduct;
      const result = await productRepository.set(product);
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res, undefined, err);
    }
  }

  async actualizar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let { ProName, ProDesc, ProCod, ProPrice, ProStock, ProCatId, ProTypId } = req.body;
      let producto: Partial<IProduct> = {
        ProName,
        ProDesc,
        ProCod,
        ProPrice,
        ProStock,
        ProCatId,
        ProTypId,
      };

      let prod = await productRepository.getById(parseInt(id));
      if (prod) {
        let data = await productRepository.upd(producto, parseInt(id));
        let productToRes = await productRepository.getById(parseInt(id));
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
      const products = await productRepository.getByKeyWord(search);
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
    }
  }

  async borrar(req: Request, res: Response) {
    try {
      let id = parseInt(req.params.id);
      let prod = await productRepository.getById(id);
      if (prod) {
        //await productPropertyRepository.deletePropertiesByProduct(id);
        await productRepository.del(id, res.locals.userData.userId);
        return constructResponse(121, res);
      } else {
        return constructResponse(123, res);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const productoController = new ProductoController();
