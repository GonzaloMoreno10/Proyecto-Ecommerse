import { Router } from 'express';
import { marcasController } from '../controllers/marcasController';
const router = Router();

router.get('/', marcasController.getMarcas);

router.get('/:productType/:categoryId', marcasController.getMarcasByProductType);

export default router;
