import { Router } from 'express';
import { modeloController } from '../controllers/model.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:marcaId?', tokenOrApiKeyIsValid, modeloController.get);

router.post('/', tokenOrApiKeyIsValid, modeloController.setModelo);

export default router;
