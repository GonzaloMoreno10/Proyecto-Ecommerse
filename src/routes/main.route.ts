import { Router } from 'express';
import orderRoute from './orders.route';
import productoRoute from './product.route';
import categoriaRoute from './category.routes';
import userRoute from './users.route';
import serverConfigRoute from './serverConfig.route';
//import mensajeRouter from './mensajes.route';
import authRouter from './auth.route';
import marcasRoute from './brand.route';
import productTypeRoute from './productType.route';
import propertiesRoute from './properties.route';
import modelosRoute from './model.route';
import lineasRoute from './line.route';
import statsRoute from './stats.route';

const router = Router();

router.use('/products', productoRoute);

router.use('/users', userRoute);

router.use('/orders', orderRoute);

router.use('/stats', statsRoute);

router.use('/marcas', marcasRoute);

router.use('/productTypes', productTypeRoute);

router.use('/properties', propertiesRoute);

router.use('/categories', categoriaRoute);

router.use('/modelos', modelosRoute);

router.use('/lineas', lineasRoute);

router.use('/server', serverConfigRoute);

//router.use('/messages', mensajeRouter);

router.use('/auth', authRouter);

export default router;
