import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err);
        return next('Usuario erroneo');
      }

      req.login(user, { session: false }, async err => {
        if (err) return next(err);
        const body = {
          _id: user._id,
          email: user.email,
          nombre: user.nombre,
          direccion: user.direccion,
          telefono: user.telefono,
          avatar: user.avatar,
          edad: user.edad,
          admin: user.admin,
        };

        const token = jwt.sign({ user: body, expiresIn: '24h' }, 'top_secret');
        return res.json({ token });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
});

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.session.destroy(() => {});
});

export default router;
