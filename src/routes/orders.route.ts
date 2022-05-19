import { Router } from 'express';
import passport from 'passport';
import { jwt } from 'twilio';
import { orderController } from '../controllers/index.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, orderController.getOrders);

router.post('/', tokenOrApiKeyIsValid, orderController.setOrder);

export default router;
