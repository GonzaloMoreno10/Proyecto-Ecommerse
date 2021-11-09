import { Router } from 'express';
import { auth } from '../middlewares/auth';
import carritoRoute from './carrito.route';
//import carritoRoute from './carrito.route';
import productoRoute from './producto.route';
import userRoute from './users.route';
import methodOverride from 'method-override';

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

router.use('/productos', productoRoute);

router.use('/carrito', auth, carritoRoute);

router.use('/users', userRoute);

export default router;
