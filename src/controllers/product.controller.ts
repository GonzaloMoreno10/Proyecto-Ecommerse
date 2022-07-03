import { Request, Response } from 'express';
import { API_URL } from '../constants/venv';
import { INewProduct, IProduct } from '../interface/product.interface';
import { pppreRepository } from '../repositories/pppre.repository';
import { productRepository } from '../repositories/product.repository';
import { constructResponse } from '../utils/constructResponse';

export class ProductoController {
  async getRelated(req: Request, res: Response) {
    try {
      const { ProId } = req.query;
      const result = await productRepository.getByRelated(Number(ProId));
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res, undefined, err);
    }
  }
  async getByOrder(req: Request, res: Response) {
    try {
      const { userId } = res.locals.userData;
      const result = await productRepository.getByLastOrderUser(parseInt(userId));
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
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
      return constructResponse(500, res);
    }
  }
  async get(req: Request, res: Response) {
    try {
      const { pageSize, page } = req.query;
      const filter = res.locals.productFilter;
      const fields = res.locals.productFields;
      const quantity = await productRepository.count();
      if (pageSize && page) {
        let nextPage: string = '';
        const limit: number = Number(pageSize || 10);
        const offset: number = Number(page || 0) * limit;
        const products = await productRepository.get(limit, offset, filter, fields);
        if (products.length > 0) {
          const nextPageProds = await productRepository.get(limit, (offset + 1) * limit);
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
        return constructResponse(121, res, {
          quantity,
          nextPage: `${API_URL}/products?pageSize=10&page=1`,
          page: 0,
          perPage: 10,
          products: await productRepository.get(10, 0, filter, fields),
        });
      }
    } catch (err) {
      return constructResponse(500, res);
    }
  }
  async set(_, res: Response) {
    try {
      const product: INewProduct = res.locals.newProduct;
      const result = await productRepository.set(product);
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res, undefined, err);
    }
  }
  async upd(req: Request, res: Response) {
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
  async getByKeyWord(req: Request, res: Response) {
    const { search } = req.params;
    try {
      const products = await productRepository.getByKeyWord(search);
      return constructResponse(121, res, products);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }
  async del(req: Request, res: Response) {
    try {
      let id = parseInt(req.params.id);
      let prod = await productRepository.getById(id);
      if (prod) {
        await productRepository.del(id, res.locals.userData.userId);
        const pppres = await pppreRepository.getByProduct(id);
        if (pppres.length) {
          pppres.map(async pre => await pppreRepository.del(pre.PreId, res.locals.userData.userId));
        }
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
