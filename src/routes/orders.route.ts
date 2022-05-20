import { Router } from 'express';
import passport from 'passport';
import { jwt } from 'twilio';
import { orderController } from '../controllers/index.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, orderController.getOrders);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, orderController.setOrder);

export default router;
