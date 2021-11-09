import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { productoController } from '../controllers';
import { Request, Response } from 'express';
import cors from 'cors';
import { auth } from '../middlewares/auth';
const router = Router();

router.use(cors());

router.get('/new/product', (req: Request, res: Response) => {
  res.render('productos/newProduct');
});

router.get('/', asyncHandler(productoController.get));

router.get('/:id', asyncHandler(productoController.getById));

router.put('/:id', auth, asyncHandler(productoController.actualizar));

router.post('/', auth, asyncHandler(productoController.agregar));

router.delete('/:id', auth, asyncHandler(productoController.borrar));

router.get('/vista/1', auth, asyncHandler(productoController.vista));

export default router;
