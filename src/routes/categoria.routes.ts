import { Router } from 'express';
import { categoriaController } from '../controllers/categoria.controller';

const router = Router();

router.get('/', categoriaController.get);

router.post('/', categoriaController.create);

export default router;