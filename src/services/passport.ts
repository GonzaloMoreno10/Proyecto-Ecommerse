import passport from 'passport';
import passportLocal from 'passport-local';
import { UserInterface } from '../interface';
import userSchema, { IUser } from '../models/user.model';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const login = async (req, email: string, password: string, done: any) => {
  const user: IUser = await userSchema.findOne({ email: email });
  if (!user) {
    req.flash('error_msg', 'Usuario incorrecto');
    return done(null, false, { message: 'Usuario incorrecto.' });
  }
  if (!(await user.matchPassword(password))) {
    req.flash('error_msg', 'Usuario incorrecto');
    return done(null, false, { message: 'Contraseña incorrecta.' });
  }

  return done(null, user);
};

passport.use('login', new LocalStrategy(strategyOptions, login));

passport.serializeUser((user: UserInterface, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  userSchema.findById(userId, function (err, user) {
    done(err, user);
  });
});
