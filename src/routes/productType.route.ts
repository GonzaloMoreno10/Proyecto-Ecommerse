import { Router } from 'express';
import { productTypeController } from '../controllers/productType.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { productTypeValidator } from '../validators/productType.validator';
const router = Router();

router.get('/', tokenOrApiKeyIsValid, productTypeController.getProductTypes);

router.get('/:id', tokenOrApiKeyIsValid, productTypeController.getProductTypeByid);

router.get('/category/:categoryId', tokenOrApiKeyIsValid, productTypeController.getproductTypeByCategory);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, productTypeValidator, productTypeController.setProductType);

export default router;
