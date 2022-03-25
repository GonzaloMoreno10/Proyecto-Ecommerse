import { Router } from 'express';
import { productTypeController } from '../controllers/productType';
const router = Router();

router.get('/', productTypeController.getProductTypes);

router.get('/:categoryId', productTypeController.getproductTypeByCategory);

export default router;
