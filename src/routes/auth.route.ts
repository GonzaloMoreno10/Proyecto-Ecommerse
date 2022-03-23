import { Router } from 'express';
import { userController } from '../controllers/users.controller';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { RecordingSettingsContext } from 'twilio/lib/rest/video/v1/recordingSettings';
import cors from 'cors';

const router = Router();

// const corsOptions = {
//   origin: 'https://suspicious-allen-156444.netlify.app',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
router.use(cors());

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(200).json(info);
        return next();
      }

      req.login(user, { session: false }, async err => {
        if (err) return next(err);
        console.log(user);
        const body = {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          direccion: user.direccion,
          telefono: user.telefono,
          avatar: user.avatar,
          edad: user.fecha_nacimiento.toISOString().slice(0, 10).replace('T', ' ').replace('-', '/').replace('-', '/'),
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
