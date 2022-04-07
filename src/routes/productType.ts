import { Router } from 'express';
import { productTypeController } from '../controllers/productType';
const router = Router();

router.get('/', productTypeController.getProductTypes);

router.get('/byId/:productTypeId', productTypeController.getProductTypeByid);

router.get('/:categoryId', productTypeController.getproductTypeByCategory);

router.get('/category/:name', productTypeController.getProductTypeByName);

router.post('/', productTypeController.setProductType);

export default router;
