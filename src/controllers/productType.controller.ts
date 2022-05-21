import { productTypeRepository } from '../repositories/productType.repository';
import { Request, Response } from 'express';
import { INewProductType } from '../interface/productType.interface';
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
      const { TypCatId, TypName } = req.body;
      const producType: INewProductType = {
        TypCatId,
        TypName,
        createdUser: res.locals.userData.userId,
      };
      const result = await productTypeRepository.setProductType(producType);
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
