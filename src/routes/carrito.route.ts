import { Router } from "express";
import { carritoController } from "../controllers/carrito.controller";

const router = Router();

router.get("/listar/:idProducto?",carritoController.findById);

router.post("/agregar/:idProd",carritoController.agregar);

router.delete("/eliminar/:idProducto",carritoController.delete);

export default router;