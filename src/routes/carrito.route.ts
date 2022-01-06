import { Router } from 'express';
import { carritoController } from '../controllers/carrito.controller';
import passport from 'passport';
const router = Router();

router.post(`/compra/new/:userId`, passport.authenticate('jwt', { session: false }), carritoController.compra);

router.get('/:idProducto?/:userId', passport.authenticate('jwt', { session: false }), carritoController.findById);

router.post('/:idProducto/:userId', passport.authenticate('jwt', { session: false }), carritoController.agregar);

router.delete('/:idProducto/:userId', passport.authenticate('jwt', { session: false }), carritoController.delete);

export default router;
