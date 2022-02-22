"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/:id?', /*passport.authenticate('jwt', { session: false }),*/ controllers_1.orderController.getOrders);
//router.post('/', /*passport.authenticate('jwt', { session: false }),*/ carrito);
router.get('/user/:userId', controllers_1.orderController.getOrdersByUser);
exports.default = router;
