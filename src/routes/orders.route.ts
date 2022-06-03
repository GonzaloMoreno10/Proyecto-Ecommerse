import { Router } from 'express';

import { orderController } from '../controllers/index.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:id?', tokenOrApiKeyIsValid, orderController.get);

//router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator,modelValidator, );

export default router;
