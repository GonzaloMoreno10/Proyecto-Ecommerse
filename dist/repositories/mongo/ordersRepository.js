"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = void 0;
const orders_model_1 = __importDefault(require("../../models/orders.model"));
class OrderRepository {
    constructor() {
        this.ordenes = orders_model_1.default;
    }
    findOrdersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let orden = yield this.ordenes.findById(id);
            return orden;
        });
    }
    findOrdersByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let orders = yield this.ordenes.find({ userId: userId });
            return orders;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let orders = yield this.ordenes.find();
            return orders;
        });
    }
    createOrder(orden) {
        return __awaiter(this, void 0, void 0, function* () {
            let newOrden = new this.ordenes(orden);
            let res = yield newOrden.save();
            return res;
        });
    }
}
exports.orderRepository = new OrderRepository();
