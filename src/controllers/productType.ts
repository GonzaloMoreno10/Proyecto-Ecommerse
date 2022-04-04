import { productTypeRepository } from '../repositories/mysql/productTypeRepository';
import { Request, Response } from 'express';
class ProductTypeController {
  async getProductTypeByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const result = await productTypeRepository.getProductTypesByName(name);
      // let productTypes = {};
      // result.forEach((productType: any) => {
      //   const productId = productType.categoryName;
      //   if (!productTypes[productId]) productTypes[productId] = [];
      //   productTypes[productId].push(productType);
      // });

      // const finalArray = [];
      // for (const i in productTypes) {
      //   const productTypesToReturn = [];
      //   const finalObject: any = {};
      //   for (const j in productTypes[i]) {
      //     console.log(productTypes[i]);
      //     const productType = { id: productTypes[i][j].productTypeId, name: productTypes[i][j].productTypeName };
      //     productTypesToReturn.push(productType);
      //     finalObject.categoryId = productTypes[i][0].categoryId;
      //     finalObject.categoryName = productTypes[i][0].categoryName;
      //   }
      //   finalObject.productTypes = productTypesToReturn;
      //   finalArray.push(finalObject);

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
