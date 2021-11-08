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
exports.mongoUserRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDbConnect_1 = __importDefault(require("../../config/mongoDbConnect"));
const usersSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    nombre: String,
    direccion: String,
    edad: Number,
    telefono: String,
    avatar: String,
});
class UsersRepository {
    constructor() {
        (0, mongoDbConnect_1.default)(this.srv);
        this.users = mongoose_1.default.model('users', usersSchema);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            try {
                output = yield this.users.find();
                return output;
            }
            catch (err) {
                return output;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let usuarios = yield this.users.findById(id.toString());
                //console.log(productos);
                return usuarios;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.email || !data.password)
                throw new Error('invalid data');
            const newUser = new this.users(data);
            console.log(newUser);
            let res = yield newUser.save();
            return res;
        });
    }
}
exports.mongoUserRepository = new UsersRepository();
