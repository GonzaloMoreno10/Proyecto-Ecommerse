"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const index_controller_1 = require("../controllers/index.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/new/product', (req, res) => {
    res.render('productos/newProduct');
});
router.get('/productType/:productType', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.getProductsByProductType);
router.get('/', auth_middleware_1.tokenOrApiKeyIsValid, (0, express_async_handler_1.default)(index_controller_1.productoController.get));
router.get('/:id', auth_middleware_1.tokenOrApiKeyIsValid, (0, express_async_handler_1.default)(index_controller_1.productoController.getById));
router.put('/pictures/:fileName', auth_middleware_1.tokenOrApiKeyIsValid, multer_middleware_1.upload.single('file'), index_controller_1.productoController.setImage);
router.get('/offers/all', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.getOffers);
router.get('/orders/user/:userId', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.getProductsByOrdersUser);
router.get('/product/related', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.getRelatedProduct);
router.get('/find/product/:search', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.find);
router.get('/userId/:userId/activo/:activo', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.getBySellerUser);
router.get('/categoria/:categoriaId', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.findByCategoria);
router.put('/:id', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.actualizar);
router.post('/', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.agregar);
router.delete('/:id', auth_middleware_1.tokenOrApiKeyIsValid, (0, express_async_handler_1.default)(index_controller_1.productoController.borrar));
router.get('/marca/:id', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.productoController.getProductsByMarca);
exports.default = router;
