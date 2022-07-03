import { Router } from 'express';
import { marcasController } from '../controllers/brands.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { brandValidator } from '../validators/brand.validator';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.get('/:BraId?', tokenOrApiKeyIsValid, marcasController.get);

router.post('/', tokenIsValid, emptyBodyValidator, brandValidator, marcasController.set);

router.delete('/:BraId', tokenIsValid, marcasController.del);

export default router;
