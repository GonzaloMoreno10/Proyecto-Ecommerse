import { Router } from 'express';
import { productPropertyController } from '../controllers/properties.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { productPropertyValidator } from '../validators/productProperty.validator';

const router = Router();

router.get('/:productTypeId', tokenOrApiKeyIsValid, productPropertyController.getPropertiesByProductType);

router.get('/', tokenOrApiKeyIsValid, productPropertyController.get);

router.post(
  '/',
  tokenOrApiKeyIsValid,
  emptyBodyValidator,
  productPropertyValidator,
  productPropertyController.setProductProperty
);

export default router;
