"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const passport_1 = __importDefault(require("passport"));
const multer_1 = require("../middlewares/multer");
const router = (0, express_1.Router)();
router.post('/editPicture/:userId', passport_1.default.authenticate('jwt', { session: false }), multer_1.upload.single('avatar'), users_controller_1.userController.editPicture);
router.get('/:id', passport_1.default.authenticate('jwt', { session: false }), users_controller_1.userController.getUsersById);
router.get('/', passport_1.default.authenticate('jwt', { session: false }), users_controller_1.userController.getUsers);
router.post('/signup', users_controller_1.userController.createUser);
router.put('/:id', passport_1.default.authenticate('jwt', { session: false }), users_controller_1.userController.editProfile);
exports.default = router;
