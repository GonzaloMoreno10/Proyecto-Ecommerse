import { Router } from 'express';
import methodOverride from 'method-override';
import { carritoController } from '../controllers/carrito.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

router.post('/compra/new', carritoController.compra);

router.get('/:idProducto?', auth, carritoController.findById);

router.post('/:idProd', auth, carritoController.agregar);

router.delete('/:idProducto', auth, carritoController.delete);

export default router;
