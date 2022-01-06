import { Router } from 'express';
import passport from 'passport';
import { orderController } from '../controllers';
const router = Router();

router.get('/:id?', passport.authenticate('jwt', { session: false }), orderController.getOrders);

router.post('/create/:userId', passport.authenticate('jwt', { session: false }), orderController.create);

export default router;
