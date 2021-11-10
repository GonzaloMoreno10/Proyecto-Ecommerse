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
exports.userController = void 0;
const mongo_1 = require("../repositories/mongo");
const gmail_1 = require("../services/gmail");
const MailStructure_1 = require("../utils/MailStructure");
const user_model_1 = __importDefault(require("../models/user.model"));
const passport_1 = __importDefault(require("passport"));
const venv_1 = require("../constantes/venv");
class UsersController {
    editPicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = Object.assign(req.user);
            //let dir = '';
            let usuario = yield mongo_1.mongoUserRepository.findById(user._id);
            let dir = `http://localhost:3000/storage/imgs/${user._id}.jpg`;
            console.log(dir);
            usuario.avatar = dir;
            console.log(usuario);
            yield mongo_1.mongoUserRepository.update(usuario, user._id);
            res.redirect('/api/users/profile');
        });
    }
    editProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuario = Object.assign(req.user);
            let { email, nombre, direccion, edad, telefono } = req.body;
            console.log(email);
            let user = {
                email,
                nombre,
                direccion,
                edad,
                telefono,
            };
            console.log(user);
            let result = yield mongo_1.mongoUserRepository.update(user, usuario._id);
            if (result._id) {
                req.flash('success_msg', 'Datos actualizados');
                return res.redirect('/api/users/profile');
            }
            else {
                req.flash('error_msg', 'Algo Fallo');
                return res.redirect('/api/users/profile');
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield passport_1.default.authenticate('login', function (err, user, info) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return res.status(401).json({ data: 'Unhautorized' });
                    }
                    req.logIn(user, function (err) {
                        if (err)
                            return next(err);
                    });
                });
            })(req, res, next);
        });
    }
    info(req, res) {
        res.send({
            session: req.session,
            sessionid: req.sessionID,
            cookies: req.cookies,
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password, nombre, direccion, edad, telefono } = req.body;
            let data = yield user_model_1.default.findOne({ email: email });
            if (!data) {
                let user = {
                    email,
                    password,
                    nombre,
                    direccion,
                    edad,
                    telefono,
                    avatar: 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_1-128.png',
                };
                try {
                    let result = yield mongo_1.mongoUserRepository.create(user);
                    if (result._id) {
                        let response = yield gmail_1.GmailService.sendEmail(venv_1.ADMIN_MAIL, 'Nuevo Registro', (0, MailStructure_1.cadena)(user));
                        console.log(response);
                        req.flash('success_msg', 'Usuario creado !');
                        res.redirect('/api/users/login');
                    }
                    else {
                        res.status(400).json('Bad Request');
                    }
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                req.flash('error_msg', 'Email ya existente');
                res.redirect('/api/users/singin');
            }
        });
    }
}
exports.userController = new UsersController();
