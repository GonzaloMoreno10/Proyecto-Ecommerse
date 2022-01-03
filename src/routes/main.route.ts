import { Router } from 'express';
import cors from 'cors';
import orderRoute from './orders.route';
import carritoRoute from './carrito.route';
import productoRoute from './producto.route';
import categoriaRoute from './categoria.routes';
import userRoute from './users.route';
import serverConfigRoute from './serverConfig.route';
import mensajeRouter from './mensajes.route';

const router = Router();

router.use('/productos', productoRoute);

router.use('/carrito', carritoRoute);

router.use('/users', userRoute);

router.use('/orders', orderRoute);

router.use('/categorias', categoriaRoute);

router.use('/server', serverConfigRoute);

router.use('/mensajes', mensajeRouter);

export default router;
