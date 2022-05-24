import { Router } from 'express';
import { modeloController } from '../controllers/model.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { modelValidator } from '../validators/model.validator';

const router = Router();

router.get('/:ModId?', tokenOrApiKeyIsValid, modeloController.get);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, modelValidator, modeloController.setModelo);

router.delete('/:ModId', tokenOrApiKeyIsValid, modeloController.delModel);

export default router;
