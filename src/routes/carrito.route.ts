import { Router } from 'express';
import { carritoController } from '../controllers/carrito.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/compra/new', carritoController.compra);

router.get('/:idProducto?', auth, carritoController.findById);

router.post('/:idProd', auth, carritoController.agregar);

router.delete('/:idProducto', auth, carritoController.delete);

export default router;
