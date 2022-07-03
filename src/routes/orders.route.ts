import { Router } from 'express';

import { orderController } from '../controllers/index.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { fieldOrderValidator, filterOrderValidator, orderValidator } from '../validators/order.validator';

const router = Router();

router.get('/:OrdId?', tokenIsValid, filterOrderValidator, fieldOrderValidator, orderController.get);

router.post('/', tokenIsValid, orderValidator, orderController.create);

export default router;
