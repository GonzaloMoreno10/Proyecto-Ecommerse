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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContrroller = void 0;
const jwt_service_1 = require("../services/jwt.service");
const users_repository_1 = require("../repositories/users.repository");
const constructResponse_1 = require("../utils/constructResponse");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const token = yield (0, jwt_service_1.generateToken)(user);
            if (token.token) {
                res.locals.token = token.token;
            }
            return (0, constructResponse_1.constructResponse)(token.code, res, token.token);
        });
    }
    accountVerification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const { hash } = req.query;
            const userFound = yield users_repository_1.mysqlUserRepository.getUsersById(parseInt(userId));
            //comentario
            if (userFound && !userFound.UsrVerfied) {
                const user = Object.assign(userFound).dataValues;
                if (user.codValidacion === hash) {
                    user.verificado = true;
                    yield users_repository_1.mysqlUserRepository.updateUser(user, user.id);
                    return (0, constructResponse_1.constructResponse)(124, res);
                }
                else {
                    return (0, constructResponse_1.constructResponse)(125, res);
                }
            }
            else {
                return (0, constructResponse_1.constructResponse)(126, res);
            }
        });
    }
}
exports.authContrroller = new AuthController();
