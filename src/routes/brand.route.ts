import { Router } from 'express';
import { marcasController } from '../controllers/brands.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
const router = Router();

router.get('/', tokenOrApiKeyIsValid, marcasController.getMarcas);

router.get('/:productType', tokenOrApiKeyIsValid, marcasController.getMarcasByProductType);

router.post('/', tokenOrApiKeyIsValid, marcasController.setMarca);

router.get('/category/:categoryId', tokenOrApiKeyIsValid, marcasController.getMarcasByCategory);

export default router;
