import { Router } from 'express';
import { lineasController } from '../controllers/lines.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { lineValidator } from '../validators/line.validator';

const router = Router();

router.get('/model/:LinModId', tokenOrApiKeyIsValid, lineasController.getByModel);

router.get('/:LinId?', tokenOrApiKeyIsValid, lineasController.getLine);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, lineValidator, lineasController.setLinea);

router.delete('/:LinId', tokenOrApiKeyIsValid, lineasController.delLine);

export default router;
