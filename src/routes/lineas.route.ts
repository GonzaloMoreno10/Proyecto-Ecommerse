import { Router } from 'express';
import { lineasController } from '../controllers/linea.controller';

const router = Router();

router.get('/:modeloId?', lineasController.get);

router.post('/', lineasController.setLinea);

export default router;
