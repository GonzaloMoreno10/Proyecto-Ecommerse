import { Router } from 'express';
import { modeloController } from '../controllers/model.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

router.get('/:marcaId?', tokenOrApiKeyIsValid, modeloController.get);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, modeloController.setModelo);

export default router;
