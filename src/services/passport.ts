import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import userSchema, { IUser } from '../models/user.model';
const localStrategy = passportLocal.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
const JWTStrategy = passportJwt.Strategy;

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await userSchema.create({ email, password });
        return done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user: IUser = await userSchema.findOne({ email });
        console.log(user);

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        if (!(await user.matchPassword(password))) {
          return done(null, false, { message: 'Contraseña incorrecta.' });
        }

        return done(null, user, { message: 'Login successfull' });
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromHeader('bearer'),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (e) {
        done(e);
      }
    }
  )
);
