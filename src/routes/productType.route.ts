import { Router } from 'express';
import { productTypeController } from '../controllers/productType.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { productTypeValidator } from '../validators/productType.validator';
const router = Router();

router.get('/', tokenOrApiKeyIsValid, productTypeController.get);

router.get('/:TypId', tokenOrApiKeyIsValid, productTypeController.getById);

router.delete('/:TypId', tokenIsValid, productTypeController.del);

router.post('/', tokenIsValid, emptyBodyValidator, productTypeValidator, productTypeController.set);

export default router;
