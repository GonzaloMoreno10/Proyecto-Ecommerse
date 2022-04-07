import { productTypeRepository } from '../repositories/mysql/productTypeRepository';
import { Request, Response } from 'express';
class ProductTypeController {
  async getProductTypeByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const result = await productTypeRepository.getProductTypesByName(name);

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async getProductTypeByid(req: Request, res: Response) {
    try {
      const { productTypeId } = req.params;
      const result = await productTypeRepository.getProductTypeById(parseInt(productTypeId));
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  async getproductTypeByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const result = await productTypeRepository.getProductTypesByCategory(parseInt(categoryId));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async setProductType(req: Request, res: Response) {
    try {
      const { categoryId, nombre } = req.body;
      const result = await productTypeRepository.setProductType({ categoryId, nombre });
      res.status(200).json({ id: Object.assign(result).insertId });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async getProductTypes(req: Request, res: Response) {
    try {
      const result = await productTypeRepository.getProductTypes();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

export const productTypeController = new ProductTypeController();
