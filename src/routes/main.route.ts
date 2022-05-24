import { Router } from 'express';
import orderRoute from './orders.route';
import productoRoute from './product.route';
import categoriaRoute from './category.routes';
import userRoute from './users.route';
import serverConfigRoute from './serverConfig.route';
//import mensajeRouter from './mensajes.route';
import authRouter from './auth.route';
import productTypeRoute from './productType.route';
import propertiesRoute from './productProperty.route';
import modelosRoute from './model.route';
import lineasRoute from './line.route';
import statsRoute from './stats.route';
import brandsRoute from './brand.route';

const router = Router();

router.use('/products', productoRoute);

router.use('/account', userRoute);

router.use('/orders', orderRoute);

router.use('/stats', statsRoute);

router.use('/brands', brandsRoute);

router.use('/productTypes', productTypeRoute);

router.use('/productProperties', propertiesRoute);

router.use('/categories', categoriaRoute);

router.use('/models', modelosRoute);

router.use('/lines', lineasRoute);

router.use('/server', serverConfigRoute);

//router.use('/messages', mensajeRouter);

router.use('/auth', authRouter);

export default router;
