import { Router } from 'express';
import { carritoController } from '../controllers/carrito.controller';
import passport from 'passport';
const router = Router();

router.post(`/`, passport.authenticate('jwt', { session: false }), carritoController.compra);

export default router;
