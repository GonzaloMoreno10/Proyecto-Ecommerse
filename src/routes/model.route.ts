import { Router } from 'express';
import { modeloController } from '../controllers/model.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { modelValidator } from '../validators/model.validator';

const router = Router();

router.get('/:ModId?', tokenOrApiKeyIsValid, modeloController.get);

router.post('/', tokenIsValid, emptyBodyValidator, modelValidator, modeloController.set);

router.delete('/:ModId', tokenIsValid, modeloController.del);

export default router;
