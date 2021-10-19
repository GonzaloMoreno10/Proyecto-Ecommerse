import { Router } from 'express';
import carritoRoute from './carrito.route';
//import carritoRoute from './carrito.route';
import productoRoute from './producto.route';
import userRoute from './users.route';

const router = Router();

router.use('/productos', productoRoute);

router.use('/carrito', carritoRoute);

router.use('/users', userRoute);

export default router;
