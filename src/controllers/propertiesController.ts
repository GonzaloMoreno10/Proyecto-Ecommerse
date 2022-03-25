import { propertiesRepository } from '../repositories/mysql/propertiesRepository';
import { Request, Response } from 'express';
class PropertyController {
  async getPropertiesByProductType(req: Request, res: Response) {
    try {
      const { productTypeId } = req.params;
      const properties = await propertiesRepository.getPropertiesByProductType(parseInt(productTypeId));
      for (const i in properties) {
        properties[i].subProperties = await propertiesRepository.getSubProperties(properties[i].id);
      }

      for (const i in properties) {
        for (const j in properties[i].subProperties) {
          properties[i].subProperties[j].values = await propertiesRepository.getProductPropertieValues(
            properties[i].subProperties[j].id
          );
        }
      }
      res.status(200).json(properties);
    } catch (err) {
      console.log(err);
    }
  }
}

export const propertyController = new PropertyController();
