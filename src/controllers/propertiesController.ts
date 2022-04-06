import { propertiesRepository } from '../repositories/mysql/propertiesRepository';
import { Request, Response } from 'express';
class PropertyController {
  async setPropertyValue(req: Request, res: Response) {
    try {
      const { value, id } = req.body;
      console.log(req.body);
      console.log(id);
      if (!value || !id) {
        return res.status(400).json({ message: 'invalid body' });
      }
      const result = await propertiesRepository.setPropertyValue({ value, id });
      console.log(result);
      return res.status(200).json({ message: 'ok', id: Object.assign(result).insertId });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async setProperties(req: Request, res: Response) {
    const { categoryId, productTypeId, propertyName, subProperties } = req.body;

    try {
      const result = await propertiesRepository.setProperty({ categoryId, productTypeId, propertyName, subProperties });
      const property: any = await propertiesRepository.getPropertyByid(result);

      const subProp = await propertiesRepository.getSubProperties(property[0].id);
      const toReturn = {
        property,
        subProperties: subProp,
      };
      console.log(toReturn);
      return res.status(200).json(toReturn);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
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
