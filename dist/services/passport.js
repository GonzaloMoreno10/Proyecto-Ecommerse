"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_model_1 = __importDefault(require("../models/user.model"));
const LocalStrategy = passport_local_1.default.Strategy;
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};
const login = (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email });
    if (!user) {
        req.flash('error_msg', 'Usuario incorrecto');
        return done(null, false, { message: 'Usuario incorrecto.' });
    }
    if (!(yield user.matchPassword(password))) {
        req.flash('error_msg', 'Usuario incorrecto');
        return done(null, false, { message: 'Contraseña incorrecta.' });
    }
    return done(null, user);
});
passport_1.default.use('login', new LocalStrategy(strategyOptions, login));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((userId, done) => {
    user_model_1.default.findById(userId, function (err, user) {
        done(err, user);
    });
});
