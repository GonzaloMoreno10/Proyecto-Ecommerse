import { Router } from "express";
import asyncHandler from 'express-async-handler'
import { productoController } from "../controllers";
import cors from 'cors'
const router = Router();

router.use(cors());

router.get("/",asyncHandler(productoController.get));

router.get("/:id",asyncHandler(productoController.getById));

router.put("/:id",asyncHandler(productoController.actualizar));

router.post("/",asyncHandler(productoController.agregar));

router.delete("/:id",asyncHandler(productoController.borrar));

router.get("/vista/1",asyncHandler(productoController.vista));

export default router;