import { Router } from 'express';
import { propertyController } from '../controllers/propertiesController';

const router = Router();

router.get('/:productTypeId', propertyController.getPropertiesByProductType);

router.get('/');

router.post('/', propertyController.setProperties);

router.post('/values', propertyController.setPropertyValue);

export default router;
