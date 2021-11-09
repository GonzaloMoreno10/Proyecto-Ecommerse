"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../middlewares/auth");
const passport_1 = __importDefault(require("passport"));
const multer_1 = require("../middlewares/multer");
const router = (0, express_1.Router)();
router.get('/login', (req, res) => {
    res.render('users/login');
});
router.post('/login', passport_1.default.authenticate('login', {
    successRedirect: '/api/productos/',
    failureRedirect: '/api/users/login',
}));
router.get('/profile', auth_1.auth, (req, res) => {
    res.render('users/profile');
});
router.post('/editPicture', auth_1.auth, multer_1.upload.single('avatar'), users_controller_1.userController.editPicture);
router.post('/edit', auth_1.auth, users_controller_1.userController.editProfile);
router.get('/edit', auth_1.auth, (req, res) => {
    res.render('users/edit');
});
router.get('/info', auth_1.auth, users_controller_1.userController.info);
router.post('/singin', (0, express_async_handler_1.default)(users_controller_1.userController.createUser));
router.get('/singin', (req, res) => {
    let user = req.user;
    res.render('users/singin', { user });
});
router.get('/logout', auth_1.auth, (req, res) => {
    req.session.destroy(() => { });
    res.redirect('/api/users/login');
});
exports.default = router;
