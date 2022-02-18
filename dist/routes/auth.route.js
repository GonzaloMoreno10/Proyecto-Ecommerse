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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                console.log(err);
                return next('Usuario erroneo');
            }
            req.login(user, { session: false }, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    return next(err);
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
                const token = jsonwebtoken_1.default.sign({ user: body, expiresIn: '24h' }, 'top_secret');
                return res.json({ token });
            }));
        }
        catch (e) {
            return next(e);
        }
    }))(req, res, next);
}));
router.get('/logout', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    req.session.destroy(() => { });
});
exports.default = router;
