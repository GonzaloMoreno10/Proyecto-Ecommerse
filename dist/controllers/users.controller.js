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
const user_model_1 = __importDefault(require("../models/user.model"));
const passport_1 = __importDefault(require("passport"));
class UsersController {
    getUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return res.json(yield mongo_1.mongoUserRepository.findById(id));
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Entre aca');
            const data = yield mongo_1.mongoUserRepository.findAll();
            return res.json(data);
        });
    }
    editPicture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userId } = req.params;
            console.log(userId);
            //let dir = '';
            let usuario = yield mongo_1.mongoUserRepository.findById(userId);
            let dir = `http://localhost:3000/storage/imgs/${userId}.jpg`;
            usuario.avatar = dir;
            try {
                yield mongo_1.mongoUserRepository.update(usuario, userId);
                const updateUser = yield mongo_1.mongoUserRepository.findById(userId);
                return res.status(200).json(updateUser);
            }
            catch (err) {
                return res.json(err);
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            console.log(id);
            const user = yield mongo_1.mongoUserRepository.findById(id);
            return res.json(user);
        });
    }
    editProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let { email, nombre, direccion, edad, telefono } = req.body;
            let user = {
                email,
                nombre,
                direccion,
                edad,
                telefono,
            };
            try {
                yield mongo_1.mongoUserRepository.update(user, id);
                let result = yield mongo_1.mongoUserRepository.findById(id);
                return res.status(200).json(result);
            }
            catch (err) {
                return res.status(500).json(err);
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
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password, nombre, direccion, edad, telefono, admin } = req.body;
            if (!email || !password) {
                return res.status(400).json('Invalid Body');
            }
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
                    admin,
                };
                console.log(user);
                try {
                    let result = yield mongo_1.mongoUserRepository.create(user);
                    console.log(result);
                    if (result._id) {
                        //Comentado por que alcance la cuota limite de emails
                        // await GmailService.sendEmail(ADMIN_MAIL, 'Nuevo Registro', cadena(user));
                        return res.status(201).json(result);
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
                return res.status(400).json('Email existente');
            }
        });
    }
}
exports.userController = new UsersController();
