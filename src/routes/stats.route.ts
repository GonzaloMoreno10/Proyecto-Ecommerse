import { Router } from 'express';
import { statsController } from '../controllers/statsController';
const router = Router();

router.get('/:productId', statsController.isMostSelled);

export default router;
