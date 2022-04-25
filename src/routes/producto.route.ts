import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { productoController } from '../controllers';
import { Request, Response } from 'express';
import { upload } from '../middlewares/multer';
import passport from 'passport';
const router = Router();

router.get('/new/product', (req: Request, res: Response) => {
  res.render('productos/newProduct');
});

router.get('/productType/:productType', productoController.getProductsByProductType);

router.get('/', asyncHandler(productoController.get));

router.get('/:id', asyncHandler(productoController.getById));

router.put(
  '/pictures/:fileName',
  passport.authenticate('jwt', { session: false }),
  upload.single('file'),
  productoController.setImage
);

router.get('/offers/all', productoController.getOffers);

router.get('/orders/user/:userId', productoController.getProductsByOrdersUser);

router.get('/product/related', asyncHandler(productoController.getRelatedProduct));

router.get('/find/product/:search', productoController.find);

router.get('/userId/:userId/activo/:activo', productoController.getBySellerUser);

router.get('/categoria/:categoriaId', productoController.findByCategoria);

router.put('/:id', passport.authenticate('jwt', { session: false }), productoController.actualizar);

router.post('/', passport.authenticate('jwt', { session: false }), productoController.agregar);

router.delete('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(productoController.borrar));

router.get('/marca/:id', productoController.getProductsByMarca);

export default router;
