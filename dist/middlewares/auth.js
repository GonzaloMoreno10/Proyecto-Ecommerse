"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
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
