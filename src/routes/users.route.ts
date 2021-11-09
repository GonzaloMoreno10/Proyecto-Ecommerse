import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
import { auth } from '../middlewares/auth';
import passport from 'passport';
import { upload } from '../middlewares/multer';
const router = Router();

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/api/productos/',
    failureRedirect: '/api/users/login',
  })
);

router.get('/profile', auth, (req, res) => {
  res.render('users/profile');
});

router.post('/editPicture', auth, upload.single('avatar'), userController.editPicture);

router.post('/edit', auth, userController.editProfile);

router.get('/edit', auth, (req, res) => {
  res.render('users/edit');
});

router.get('/info', auth, userController.info);

router.post('/singin', asyncHandler(userController.createUser));

router.get('/singin', (req, res) => {
  let user = req.user;
  res.render('users/singin', { user });
});

router.get('/logout', auth, (req, res) => {
  req.session.destroy(() => {});
  res.redirect('/api/users/login');
});

export default router;
