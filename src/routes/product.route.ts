import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { productoController } from '../controllers/index.controller';
import { Request, Response } from 'express';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { fieldValidator, filterValidator, productValidator } from '../validators/product.validator';
const router = Router();

router.get('/new/product', (req: Request, res: Response) => {
  res.render('productos/newProduct');
});

router.get('/', tokenOrApiKeyIsValid, fieldValidator, filterValidator, asyncHandler(productoController.get));

router.get('/:id', tokenOrApiKeyIsValid, asyncHandler(productoController.getById));

router.get('/orders/user/:userId', tokenOrApiKeyIsValid, productoController.getByOrder);

router.get('/product/related', tokenOrApiKeyIsValid, productoController.getRelated);

router.get('/find/product/:search', tokenOrApiKeyIsValid, productoController.getByKeyWord);

router.put('/:id', tokenOrApiKeyIsValid, productoController.upd);

router.post('/', tokenOrApiKeyIsValid, emptyBodyValidator, productValidator, productoController.set);

router.delete('/:id', tokenOrApiKeyIsValid, asyncHandler(productoController.del));

export default router;
