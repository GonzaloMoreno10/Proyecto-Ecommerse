import { Router } from 'express';

import { orderController } from '../controllers/index.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, orderController.getOrders);

//router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, orderController.setOrder);

export default router;
