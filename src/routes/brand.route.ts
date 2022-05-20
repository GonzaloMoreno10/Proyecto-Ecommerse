import { Router } from 'express';
import { marcasController } from '../controllers/brands.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { brandValidator } from '../validators/brand.validator';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.get('/', tokenOrApiKeyIsValid, marcasController.getMarcas);

router.get('/productType/:BraTypId', tokenOrApiKeyIsValid, marcasController.getMarcasByProductType);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, brandValidator, marcasController.setMarca);

router.get('/category/:BraCatId', tokenOrApiKeyIsValid, marcasController.getMarcasByCategory);

router.get('/:BraId', tokenOrApiKeyIsValid, marcasController.getBrandsById);

export default router;
