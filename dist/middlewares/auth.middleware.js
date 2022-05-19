"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenOrApiKeyIsValid = exports.auth = void 0;
const venv_1 = require("../constants/venv");
const jwt_service_1 = require("../services/jwt.service");
const auth = (req, res, next) => {
    if (req.user) {
        return next();
    }
    else {
        let message = 'No estas logueado';
        res.render('users/notLogued', { message });
    }
};
exports.auth = auth;
const tokenOrApiKeyIsValid = (req, res, next) => {
    const { apikey, authorization } = req.headers;
    if (apikey) {
        if (apikey === venv_1.APIKEY) {
            return next();
        }
        else {
            return res.status(401).json({ code: 401, message: 'Invalid apikey' });
        }
    }
    if (authorization) {
        const result = (0, jwt_service_1.verfiyToken)(authorization.replace('Bearer ', ''));
        if (result.code !== 200) {
            return res.status(401).json({ code: result.code, message: result.message });
        }
        else {
            res.locals.userData = result.userData;
            return next();
        }
    }
    return res.status(401).json({ code: 401, message: 'No headers values' });
};
exports.tokenOrApiKeyIsValid = tokenOrApiKeyIsValid;
