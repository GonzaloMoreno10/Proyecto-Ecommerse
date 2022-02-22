import { Router } from 'express';
import passport from 'passport';
import { jwt } from 'twilio';
import { orderController } from '../controllers';
const router = Router();

router.get('/:id?', passport.authenticate('jwt', { session: false }), orderController.getOrders);

router.get('/user/:userId', passport.authenticate('jwt', { session: false }), orderController.getOrdersByUser);

export default router;
