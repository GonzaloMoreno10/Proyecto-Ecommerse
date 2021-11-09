"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/storage/imgs');
    },
    filename: function (req, file, cb) {
        let user = Object.assign(req.user);
        cb(null, user._id + '.jpg');
    },
});
exports.upload = (0, multer_1.default)({
    storage: exports.storage,
});
