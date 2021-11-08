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
exports.userController = void 0;
const mongo_1 = require("../repositories/mongo");
class UsersController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield mongo_1.mongoUserRepository.findAll();
            res.json(data);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password, nombre, direccion, edad, telefono, avatar } = req.body;
            let user = {
                email,
                password,
                nombre,
                direccion,
                edad,
                telefono,
                avatar,
            };
            try {
                let result = yield mongo_1.mongoUserRepository.create(user);
                console.log(result);
                res.status(200).json(result);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
}
exports.userController = new UsersController();
