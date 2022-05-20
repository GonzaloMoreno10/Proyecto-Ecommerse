import { Router } from 'express';
import { propertyController } from '../controllers/properties.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.get('/:productTypeId', tokenOrApiKeyIsValid, propertyController.getPropertiesByProductType);

router.get('/', tokenOrApiKeyIsValid);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, propertyController.setProperties);

router.post('/values', tokenOrApiKeyIsValid, propertyController.setPropertyValue);

export default router;
