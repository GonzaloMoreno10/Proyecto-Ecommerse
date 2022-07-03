import { Router } from 'express';
import { pppreController } from '../controllers/pppre.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { pppreValidator } from '../validators/pppre.validator';

const router = Router();

router.get('/:PreId?', tokenOrApiKeyIsValid, pppreController.get);

router.post('/', tokenIsValid, emptyBodyValidator, pppreValidator, pppreController.set);

router.delete('/:PreId', tokenIsValid, pppreController.del);

export default router;
