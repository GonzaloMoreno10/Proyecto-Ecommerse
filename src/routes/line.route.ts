import { Router } from 'express';
import { lineasController } from '../controllers/lines.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:modeloId?', tokenOrApiKeyIsValid, lineasController.get);

router.post('/', tokenOrApiKeyIsValid, lineasController.setLinea);

export default router;
