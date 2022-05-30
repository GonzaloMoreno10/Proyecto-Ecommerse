import { Router } from 'express';
import { marcasController } from '../controllers/brands.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { brandValidator } from '../validators/brand.validator';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.get('/', tokenOrApiKeyIsValid, marcasController.get);

router.get('/productType/:BraTypId', tokenOrApiKeyIsValid, marcasController.getByProductType);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, brandValidator, marcasController.set);

router.get('/category/:BraCatId', tokenOrApiKeyIsValid, marcasController.getByCategory);

router.get('/:BraId', tokenOrApiKeyIsValid, marcasController.getById);

router.delete('/:BraId', tokenOrApiKeyIsValid, marcasController.del);

export default router;
