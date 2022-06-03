import { Router } from 'express';
import { modeloController } from '../controllers/model.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { modelValidator } from '../validators/model.validator';

const router = Router();

router.get('/:ModId?', tokenOrApiKeyIsValid, modeloController.get);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, modelValidator, modeloController.set);

router.delete('/:ModId', tokenOrApiKeyIsValid, modeloController.del);

export default router;
