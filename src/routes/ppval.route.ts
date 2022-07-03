import { Router } from 'express';
import { ppvalController } from '../controllers/ppval.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { ppvalValidator } from '../validators/ppval.validator';

const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, ppvalController.get);

router.post('/', tokenIsValid, emptyBodyValidator, ppvalValidator, ppvalController.set);

router.delete('/:SuiId', tokenIsValid, ppvalController.del);

export default router;
