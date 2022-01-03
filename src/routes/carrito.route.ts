import { Router } from 'express';
import { carritoController } from '../controllers/carrito.controller';
import { auth } from '../middlewares/auth';
import cors from 'cors';
import passport from 'passport';
const router = Router();

router.post(`/compra/new/:userId`, passport.authenticate('jwt', { session: false }), carritoController.compra);

router.get('/:userId', carritoController.findById);

router.post('/:idProd/:userId', passport.authenticate('jwt', { session: false }), carritoController.agregar);

router.delete('/:idProducto/:userId', passport.authenticate('jwt', { session: false }), carritoController.delete);

export default router;
