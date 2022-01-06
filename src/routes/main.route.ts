import { Router } from 'express';
import orderRoute from './orders.route';
import carritoRoute from './carrito.route';
import productoRoute from './producto.route';
import categoriaRoute from './categoria.routes';
import userRoute from './users.route';
import serverConfigRoute from './serverConfig.route';
import mensajeRouter from './mensajes.route';
import authRouter from './auth.route';

const router = Router();

router.use('/productos', productoRoute);

router.use('/carrito', carritoRoute);

router.use('/usuarios', userRoute);

router.use('/ordenes', orderRoute);

router.use('/categorias', categoriaRoute);

router.use('/server', serverConfigRoute);

router.use('/mensajes', mensajeRouter);

router.use('/auth', authRouter);

export default router;
