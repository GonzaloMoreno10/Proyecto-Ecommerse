import { Router } from 'express';
import { productPropertyController } from '../controllers/properties.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { productPropertyValidator } from '../validators/productProperty.validator';

const router = Router();

router.get('/:productTypeId', tokenOrApiKeyIsValid, productPropertyController.getByProductType);

router.get('/', tokenOrApiKeyIsValid, productPropertyController.get);

router.post('/', tokenIsValid, emptyBodyValidator, productPropertyValidator, productPropertyController.set);

export default router;
