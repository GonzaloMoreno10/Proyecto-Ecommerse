import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import { authContrroller } from '../controllers/auth.controller';
import { tokenOrApiKeyIsValid } from '../middlewares/auth.middleware';
import { validAccountData } from '../validators/account.validator';
import { emptyBodyValidator } from '../validators/emptyBody.validator';

const router = Router();

// router.post(
//   '/editPicture/:userId',
//   tokenOrApiKeyIsValid,
//   upload.single('avatar'),
//   userController.editPicture
// );

router.get('/mailValidation/:userId', authContrroller.accountVerification);

router.get('/:id', tokenOrApiKeyIsValid, userController.getById);
router.get('/', tokenOrApiKeyIsValid, userController.get);

router.post('/signup', emptyBodyValidator, validAccountData, userController.set);

export default router;
