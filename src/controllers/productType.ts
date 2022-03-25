import { productTypeRepository } from '../repositories/mysql/productTypeRepository';
import { Request, Response } from 'express';
class ProductTypeController {
  async getproductTypeByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const result = await productTypeRepository.getProductTypesByCategory(parseInt(categoryId));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
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
