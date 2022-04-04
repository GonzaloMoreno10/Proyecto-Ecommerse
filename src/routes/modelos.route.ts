import { Router } from 'express';
import { modeloController } from '../controllers/modelo.controller';

const router = Router();

router.get('/:marcaId?', modeloController.get);

router.post('/', modeloController.setModelo);

export default router;
