import { Router } from 'express';
import { orderController } from '../controllers';
import { auth } from '../middlewares/auth';
import cors from 'cors';
import passport from 'passport';
const router = Router();

router.get('/:userId', orderController.getOrdersByUser);

router.post('/', orderController.create);

export default router;
