import { productTypeRepository } from '../repositories/productType.repository';
import { Request, Response } from 'express';
import { INewProductType } from '../interface/productType.interface';
import { constructResponse } from '../utils/constructResponse';
class ProductTypeController {
  async getProductTypeByid(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await productTypeRepository.getProductTypeById(parseInt(id));
      if (result) return constructResponse(121, res, result);

      return constructResponse(123, res);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
  async getproductTypeByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const result = await productTypeRepository.getProductTypesByCategory(parseInt(categoryId));
      if (result.length > 0) return constructResponse(121, res, result);
      return constructResponse(123, res);
    } catch (err) {
      return constructResponse(500, res);
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
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async getProductTypes(req: Request, res: Response) {
    try {
      const result = await productTypeRepository.getProductTypes();
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
}

export const productTypeController = new ProductTypeController();
