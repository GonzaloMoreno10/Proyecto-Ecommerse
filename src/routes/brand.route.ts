import { Router } from 'express';
import { marcasController } from '../controllers/brands.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { brandValidator } from '../validators/brand.validator';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.get('/', tokenOrApiKeyIsValid, marcasController.get);

router.get('/:BraId', tokenOrApiKeyIsValid, marcasController.getById);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, brandValidator, marcasController.set);

router.delete('/:BraId', tokenOrApiKeyIsValid, marcasController.del);

export default router;
