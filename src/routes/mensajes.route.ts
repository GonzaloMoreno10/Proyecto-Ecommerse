import { Router } from 'express';
import { mensajesController } from '../controllers/mensaje.controller';
const router = Router();

router.get('/:email', mensajesController.getByEmail);

export default router;
