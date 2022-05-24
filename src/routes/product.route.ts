import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { productoController } from '../controllers/index.controller';
import { Request, Response } from 'express';
import { upload } from '../middlewares/multer.middleware';
import passport from 'passport';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { productValidator } from '../validators/product.validator';
const router = Router();

router.get('/new/product', (req: Request, res: Response) => {
  res.render('productos/newProduct');
});

router.get('/productType/:productType', tokenOrApiKeyIsValid, productoController.getProductsByProductType);

router.get('/', tokenOrApiKeyIsValid, asyncHandler(productoController.get));

router.get('/:id', tokenOrApiKeyIsValid, asyncHandler(productoController.getById));

router.get('/offers/all', tokenOrApiKeyIsValid, productoController.getOffers);

router.get('/orders/user/:userId', tokenOrApiKeyIsValid, productoController.getProductsByOrdersUser);

router.get('/product/related', tokenOrApiKeyIsValid, productoController.getRelatedProduct);

router.get('/find/product/:search', tokenOrApiKeyIsValid, productoController.find);

router.get('/userId/:userId/activo/:activo', tokenOrApiKeyIsValid, productoController.getBySellerUser);

router.get('/categoria/:categoriaId', tokenOrApiKeyIsValid, productoController.findByCategoria);

router.put('/:id', tokenOrApiKeyIsValid, productoController.actualizar);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, productValidator, productoController.agregar);

router.delete('/:id', tokenOrApiKeyIsValid, asyncHandler(productoController.borrar));

router.get('/marca/:id', tokenOrApiKeyIsValid, productoController.getProductsByMarca);

export default router;
