import { Router } from 'express';
import { categoriaController } from '../controllers/category.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { validCategory } from '../validators/category.validator';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, categoriaController.get);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, validCategory, categoriaController.set);

export default router;
