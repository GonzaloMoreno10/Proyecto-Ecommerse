"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
const isAdmin = false;
const check = (req, res, next) => {
    if (isAdmin) {
        console.log(req);
        return next();
    }
    else {
        res.status(401).json({
            data: 'Unhautorized'
        });
    }
};
exports.check = check;
