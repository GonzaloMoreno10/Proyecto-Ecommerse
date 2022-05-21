import { productPropertyRepository } from '../repositories/productProperties.repository';
import { Request, Response } from 'express';
class PropertyController {
  async setPropertyValue(req: Request, res: Response) {
    // try {
    //   const { value, id } = req.body;
    //   if (!value || !id) {
    //     return res.status(400).json({ message: 'invalid body' });
    //   }
    //   const result = await productPropertyRepository.setPropertyValue({ value, id });
    //   return res.status(200).json({ message: 'ok', id: Object.assign(result).insertId });
    // } catch (err) {
    //   console.log(err);
    //   return res.status(500).json(err);
    // }
  }

  async setProperties(req: Request, res: Response) {
    // const { categoryId, productTypeId, propertyName, subProperties } = req.body;
    // try {
    //   const result = await productPropertyRepository.setProperty({ categoryId, productTypeId, propertyName, subProperties });
    //   const property: any = await productPropertyRepository.getproductPropertyById(result);
    //   const subProp = await propertiesRepository.getSubProperties(property[0].id);
    //   const toReturn = {
    //     property,
    //     subProperties: subProp,
    //   };
    //   return res.status(200).json(toReturn);
    // } catch (err) {
    //   return res.status(400).json(err);
    // }
  }
  async getPropertiesByProductType(req: Request, res: Response) {
    try {
      const { productTypeId } = req.params;
      const properties = await productPropertyRepository.getProductPropertyByProductTypeId(parseInt(productTypeId));
      res.status(200).json(properties);
    } catch (err) {
      console.log(err);
    }
  }
}

export const propertyController = new PropertyController();
