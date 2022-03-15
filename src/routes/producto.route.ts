import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { productoController } from '../controllers';
import { Request, Response } from 'express';
import passport from 'passport';
const router = Router();

router.get('/new/product', (req: Request, res: Response) => {
  res.render('productos/newProduct');
});

router.get('/', asyncHandler(productoController.get));

router.get('/:id', asyncHandler(productoController.getById));

router.get('/product/related', asyncHandler(productoController.getRelatedProduct));

router.get('/find/product/:search', productoController.find);

router.get('/categoria/:categoriaId', productoController.findByCategoria);

router.put('/:id', passport.authenticate('jwt', { session: false }), productoController.actualizar);

router.post('/', passport.authenticate('jwt', { session: false }), productoController.agregar);

router.delete('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(productoController.borrar));

export default router;
