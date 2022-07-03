import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { productoController } from '../controllers/index.controller';
import { Request, Response } from 'express';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { emptyBodyValidator } from '../validators/emptyBody.validator';
import { fieldValidator, filterValidator, productValidator } from '../validators/product.validator';
const router = Router();

router.get('/new/product', (req: Request, res: Response) => {
  res.render('productos/newProduct');
});

router.get('/', tokenOrApiKeyIsValid, fieldValidator, filterValidator, asyncHandler(productoController.get));

router.get('/:id', tokenOrApiKeyIsValid, asyncHandler(productoController.getById));

router.get('/order/user', tokenIsValid, productoController.getByOrder);

router.get('/product/related', tokenOrApiKeyIsValid, productoController.getRelated);

router.get('/find/name/:search', tokenOrApiKeyIsValid, productoController.getByKeyWord);

router.put('/:id', tokenIsValid, productoController.upd);

router.post('/', tokenIsValid, emptyBodyValidator, productValidator, productoController.set);

router.delete('/:id', tokenIsValid, asyncHandler(productoController.del));

export default router;
