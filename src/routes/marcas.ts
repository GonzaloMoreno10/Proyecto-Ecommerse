import { Router } from 'express';
import { marcasController } from '../controllers/marcasController';
const router = Router();

router.get('/', marcasController.getMarcas);

router.get('/:productType', marcasController.getMarcasByProductType);

router.post('/', marcasController.setMarca);

router.get('/category/:categoryId', marcasController.getMarcasByCategory);

export default router;
