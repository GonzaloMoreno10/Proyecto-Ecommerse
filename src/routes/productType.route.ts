import { Router } from 'express';
import { productTypeController } from '../controllers/productType.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
const router = Router();

router.get('/', tokenOrApiKeyIsValid, productTypeController.getProductTypes);

router.get('/byId/:productTypeId', tokenOrApiKeyIsValid, productTypeController.getProductTypeByid);

router.get('/:categoryId', tokenOrApiKeyIsValid, productTypeController.getproductTypeByCategory);

router.get('/category/:name', tokenOrApiKeyIsValid, productTypeController.getProductTypeByName);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, productTypeController.setProductType);

export default router;
