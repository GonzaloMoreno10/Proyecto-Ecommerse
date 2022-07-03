import { Router } from 'express';
import { orderProductController } from '../controllers/orderProduct.controller';
import { tokenIsValid } from '../middlewares/auth.middleware';
import { orderValidator } from '../validators/order.validator';
import { faorpValidator, orpFilterValidator } from '../validators/orderProduct.validator';

export const orpRouter = Router();

orpRouter.get('/:OrpId?', tokenIsValid, orpFilterValidator, orderProductController.get);

orpRouter.post('/', tokenIsValid, orderValidator, faorpValidator, orderProductController.set);
