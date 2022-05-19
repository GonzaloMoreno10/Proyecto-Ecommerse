"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const account_validator_1 = require("../validators/account.validator");
const router = (0, express_1.Router)();
// router.post(
//   '/editPicture/:userId',
//   tokenOrApiKeyIsValid,
//   upload.single('avatar'),
//   userController.editPicture
// );
router.get('/mailValidation/:userId', auth_controller_1.authContrroller.accountVerification);
router.get('/:id', auth_middleware_1.tokenOrApiKeyIsValid, users_controller_1.userController.getUsersById);
router.get('/', auth_middleware_1.tokenOrApiKeyIsValid, users_controller_1.userController.getUsers);
router.post('/signup', account_validator_1.validAccountData, users_controller_1.userController.createUser);
exports.default = router;
