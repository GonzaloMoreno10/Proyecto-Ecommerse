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

const router = Router();

router.use('/products', productoRoute);

router.use('/cart', carritoRoute);

router.use('/users', userRoute);

router.use('/orders', orderRoute);

router.use('/compra', compraRoute);

router.use('/marcas', marcasRoute);

router.use('/productTypes', productTypeRoute);

router.use('/properties', propertiesRoute);

router.use('/categories', categoriaRoute);

router.use('/server', serverConfigRoute);

router.use('/messages', mensajeRouter);

router.use('/auth', authRouter);

export default router;
