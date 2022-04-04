import { Router } from 'express';
import { marcasController } from '../controllers/marcasController';
const router = Router();

router.get('/', marcasController.getMarcas);

router.get('/:productType', marcasController.getMarcasByProductType);

router.post('/', marcasController.setMarca);

export default router;
