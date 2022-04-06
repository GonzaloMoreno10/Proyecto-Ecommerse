import { Router } from 'express';
import { categoriaController } from '../controllers/categoria.controller';

const router = Router();

router.get('/:id?', categoriaController.get);

router.post('/', categoriaController.create);

router.get('/nombre/:nombre', categoriaController.getCategoriesByName);

export default router;
