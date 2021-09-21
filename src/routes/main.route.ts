import { Router } from "express";
import carritoRoute from "./carrito.route";
//import carritoRoute from './carrito.route';
import productoRoute from './producto.route';

const router = Router();

router.use("/productos",productoRoute);

router.use("/carrito",carritoRoute);

export default router;