import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import { authContrroller } from '../controllers/auth.controller';
import { tokenIsValid, tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { validAccountData } from '../validators/account.validator';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

// router.post(
//   '/editPicture/:userId',
//   tokenOrApiKeyIsValid,
//   upload.single('avatar'),
//   userController.editPicture
// );

router.get('/mailValidation/:UsrEmail', tokenOrApiKeyIsValid, authContrroller.accountVerification);

router.get('/:id', tokenIsValid, userController.getById);
router.get('/', tokenIsValid, userController.get);

router.post('/signup', tokenOrApiKeyIsValid, emptyBodyValidator, validAccountData, userController.set);

export default router;
