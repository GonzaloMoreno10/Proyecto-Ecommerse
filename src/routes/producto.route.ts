import { Router } from "express";
import { productoController } from "../controllers";

const router = Router();

router.get("/listar",productoController.get);

router.get("/listar/:id",productoController.getById);

router.put("/actualizar/:id",productoController.actualizar);

router.post("/crear",productoController.agregar);

router.delete("/eliminar",productoController.borrar);

export default router;