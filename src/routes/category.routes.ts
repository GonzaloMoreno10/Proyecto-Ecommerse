import { Router } from 'express';
import { categoriaController } from '../controllers/category.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, categoriaController.get);

router.post('/', tokenOrApiKeyIsValid, categoriaController.create);

router.get('/nombre/:nombre', tokenOrApiKeyIsValid, categoriaController.getCategoriesByName);

export default router;
