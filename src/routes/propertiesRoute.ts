import { Router } from 'express';
import { propertyController } from '../controllers/propertiesController';

const router = Router();

router.get('/:productTypeId', propertyController.getPropertiesByProductType);

export default router;
