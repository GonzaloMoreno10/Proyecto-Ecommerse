import { Router } from 'express';
import { categoriaController } from '../controllers/category.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { validCategory } from '../validators/category.validator';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, categoriaController.get);

router.post('/', tokenIsValid, emptyBodyValidator, validCategory, categoriaController.set);

router.delete('/:CatId', tokenIsValid, categoriaController.del);

export default router;
