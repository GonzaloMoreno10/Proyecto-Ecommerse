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
exports.documentIsValid = exports.validAccountData = void 0;
const users_repository_1 = require("../repositories/users.repository");
const constructResponse_1 = require("../utils/constructResponse");
const validAccountData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    const errors = [];
    if (post.UsrEmail) {
        const exists = yield users_repository_1.mysqlUserRepository.getUsersByEmail(post.UsrEmail);
        if (exists)
            errors.push(127);
    }
    if (post.UsrDoc) {
        if (!(0, exports.documentIsValid)(post.UsrDoc))
            errors.push(125);
    }
    if (post.UsrPass) {
        if (!passwordIsValid(post.UsrPass))
            errors.push(132);
    }
    if (!errors.length) {
        const newAccount = {
            email: post.UsrEmail,
            password: post.UsrPass,
            nombre: post.UsrName,
            direccion: post.UsrAddress,
            documento: post.UsrDoc,
            tipoDocumento: post.UsrDocType,
            fecha_nacimiento: post.UsrBirthDate,
            createdUser: 1,
            telefono: post.UsrPhone,
            avatar: 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_1-128.png',
            rol_id: 1,
            verificado: false,
            codValidacion: null,
        };
        res.locals.accountData = newAccount;
        return next();
    }
    else {
        console.log(errors);
        return (0, constructResponse_1.constructResponse)(errors, res);
    }
});
exports.validAccountData = validAccountData;
const documentIsValid = (document) => {
    return /^[0-9]{8}$/.test(document.toString());
};
exports.documentIsValid = documentIsValid;
const passwordIsValid = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(password);
};
