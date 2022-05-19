import { Router } from 'express';
import { statsController } from '../controllers/stats.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
const router = Router();

router.get('/:productId', tokenOrApiKeyIsValid, statsController.isMostSelled);

export default router;
