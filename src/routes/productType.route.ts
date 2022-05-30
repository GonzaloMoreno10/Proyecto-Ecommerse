import { Router } from 'express';
import { productTypeController } from '../controllers/productType.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { productTypeValidator } from '../validators/productType.validator';
const router = Router();

router.get('/', tokenOrApiKeyIsValid, productTypeController.get);

router.get('/:TypId', tokenOrApiKeyIsValid, productTypeController.getById);

router.delete('/:TypId', tokenOrApiKeyIsValid, productTypeController.del);

router.get('/category/:TypCatId', tokenOrApiKeyIsValid, productTypeController.getByCategory);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, productTypeValidator, productTypeController.set);

export default router;
