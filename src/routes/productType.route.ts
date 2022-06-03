import { Router } from 'express';
import { productTypeController } from '../controllers/productType.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { productTypeValidator } from '../validators/productType.validator';
const router = Router();

router.get('/', tokenOrApiKeyIsValid, productTypeController.getProductTypes);

router.get('/:TypId', tokenOrApiKeyIsValid, productTypeController.getProductTypeByid);

router.delete('/:TypId', tokenOrApiKeyIsValid, productTypeController.delProductType);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, productTypeValidator, productTypeController.setProductType);

export default router;
