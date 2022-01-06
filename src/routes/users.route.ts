import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import passport from 'passport';
import { upload } from '../middlewares/multer';
import jwt from 'jsonwebtoken';

const router = Router();

router.post(
  '/editPicture/:userId',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  userController.editPicture
);

router.get('/:id', passport.authenticate('jwt', { session: false }), userController.getUsersById);
router.get('/', passport.authenticate('jwt', { session: false }), userController.getUsers);

router.post('/signup', userController.createUser);

router.put('/:id', passport.authenticate('jwt', { session: false }), userController.editProfile);

export default router;
