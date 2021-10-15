import { Router } from "express";
import { carritoController } from "../controllers/carrito.controller";

const router = Router();

router.get("/:idProducto?",carritoController.findById);

router.post("/:idProd",carritoController.agregar);

router.delete("/:idProducto",carritoController.delete);

export default router;