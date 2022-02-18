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
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const localStrategy = passport_local_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const JWTStrategy = passport_jwt_1.default.Strategy;
passport_1.default.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.create({ email, password });
        return done(null, user);
    }
    catch (e) {
        done(e);
    }
})));
passport_1.default.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (!(yield user.matchPassword(password))) {
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }
        return done(null, user, { message: 'Login successfull' });
    }
    catch (e) {
        return done(e);
    }
})));
passport_1.default.use(new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromHeader('bearer'),
}, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, token.user);
    }
    catch (e) {
        done(e);
    }
})));
