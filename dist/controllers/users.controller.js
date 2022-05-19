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
const gmail_service_1 = require("../services/gmail.service");
const users_repository_1 = require("../repositories/users.repository");
const passport_1 = __importDefault(require("passport"));
const emailTemplate_1 = require("../utils/emailTemplate");
const constructResponse_1 = require("../utils/constructResponse");
class UsersController {
    getUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            return res.json(yield users_repository_1.mysqlUserRepository.getUsersById(id));
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_repository_1.mysqlUserRepository.getUsers();
        });
    }
    // async editPicture(req: Request, res: Response) {
    //   let userId = parseInt(req.params.userId);
    //   //let dir = '';
    //   let usuario = await mysqlUserRepository.getUsersById(userId);
    //   let dir = `http://localhost:3000/storage/imgs/${userId}.jpg`;
    //   usuario.avatar = dir;
    //   try {
    //     await mysqlUserRepository.updateUser(usuario, userId);
    //     const updateUser = await mysqlUserRepository.getUsersById(userId);
    //     return res.status(200).json(updateUser);
    //   } catch (err) {
    //     return res.json(err);
    //   }
    // }
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
    createUser(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountData = res.locals.accountData;
            try {
                yield users_repository_1.mysqlUserRepository.setUser(accountData);
                const usuario = yield users_repository_1.mysqlUserRepository.getUsersByEmail(accountData.email);
                if (usuario) {
                    gmail_service_1.GmailService.sendEmail(accountData.email, 'Creacion de cuenta', (0, emailTemplate_1.verifyAccount)(usuario.UsrId, usuario.UsrValidCod));
                    return (0, constructResponse_1.constructResponse)(122, res);
                }
                else {
                    return (0, constructResponse_1.constructResponse)(125, res);
                }
            }
            catch (err) {
                console.log(err);
                return (0, constructResponse_1.constructResponse)(125, res);
            }
        });
    }
}
exports.userController = new UsersController();
