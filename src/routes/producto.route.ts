import { Router } from "express";
import asyncHandler from 'express-async-handler'
import { productoController } from "../controllers";
const router = Router();


router.get("/listar",asyncHandler(productoController.get));

router.get("/listar/:id",asyncHandler(productoController.getById));

router.put("/actualizar/:id",asyncHandler(productoController.actualizar));

router.post("/crear",asyncHandler(productoController.agregar));

router.delete("/eliminar/:id",asyncHandler(productoController.borrar));

export default router;