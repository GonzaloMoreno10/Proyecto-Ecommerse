import { Router } from 'express';
import orderRoute from './orders.route';
import carritoRoute from './carrito.route';
import productoRoute from './producto.route';
import categoriaRoute from './categoria.routes';
import userRoute from './users.route';
import serverConfigRoute from './serverConfig.route';
import mensajeRouter from './mensajes.route';
import authRouter from './auth.route';
import compraRoute from './compra.route';
import marcasRoute from './marcas';
import productTypeRoute from './productType';
import propertiesRoute from './propertiesRoute';
import modelosRoute from './modelos.route';
import lineasRoute from './lineas.route';
import statsRoute from './stats.route';

const router = Router();

router.use('/products', productoRoute);

router.use('/cart', carritoRoute);

router.use('/users', userRoute);

router.use('/orders', orderRoute);

router.use('/stats', statsRoute);

router.use('/compra', compraRoute);

router.use('/marcas', marcasRoute);

router.use('/productTypes', productTypeRoute);

router.use('/properties', propertiesRoute);

router.use('/categories', categoriaRoute);

router.use('/modelos', modelosRoute);

router.use('/lineas', lineasRoute);

router.use('/server', serverConfigRoute);

router.use('/messages', mensajeRouter);

router.use('/auth', authRouter);

export default router;
