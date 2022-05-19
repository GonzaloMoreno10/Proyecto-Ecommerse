"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const controllers_1 = require("../controllers");
const multer_1 = require("../middlewares/multer");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/new/product', (req, res) => {
    res.render('productos/newProduct');
});
router.get('/productType/:productType', controllers_1.productoController.getProductsByProductType);
router.get('/', (0, express_async_handler_1.default)(controllers_1.productoController.get));
router.get('/:id', (0, express_async_handler_1.default)(controllers_1.productoController.getById));
router.put('/pictures/:fileName', passport_1.default.authenticate('jwt', { session: false }), multer_1.upload.single('file'), controllers_1.productoController.setImage);
router.get('/offers/all', controllers_1.productoController.getOffers);
router.get('/orders/user/:userId', controllers_1.productoController.getProductsByOrdersUser);
router.get('/product/related', (0, express_async_handler_1.default)(controllers_1.productoController.getRelatedProduct));
router.get('/find/product/:search', controllers_1.productoController.find);
router.get('/userId/:userId/activo/:activo', controllers_1.productoController.getBySellerUser);
router.get('/categoria/:categoriaId', controllers_1.productoController.findByCategoria);
router.put('/:id', passport_1.default.authenticate('jwt', { session: false }), controllers_1.productoController.actualizar);
router.post('/', passport_1.default.authenticate('jwt', { session: false }), controllers_1.productoController.agregar);
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, express_async_handler_1.default)(controllers_1.productoController.borrar));
router.get('/marca/:id', controllers_1.productoController.getProductsByMarca);
exports.default = router;
