import { Router } from 'express';
import { ppsuiController } from '../controllers/ppsui.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { ppsuiValidator } from '../validators/ppsui.validator';

const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, ppsuiController.get);

router.post('/', tokenIsValid, emptyBodyValidator, ppsuiValidator, ppsuiController.set);

router.delete('/:SuiId', tokenIsValid, ppsuiController.del);

export default router;
