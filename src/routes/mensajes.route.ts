import { Router } from 'express';
import passport from 'passport';
import { mensajesController } from '../controllers/mensaje.controller';
const router = Router();

router.get('/:email', passport.authenticate('jwt', { session: false }), mensajesController.getByEmail);

export default router;
