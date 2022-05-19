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
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsRepository = void 0;
const sequelize_1 = require("../datasource/sequelize");
class StatsRepository {
    getTop3MostSelledFromProductType(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield sequelize_1.ProductModel.findOne({ where: { ProId: productId }, attributes: ['product_type_id'] });
            const result = yield sequelize_1.ProductModel.findAll({
                where: { ProTypId: product.ProTypId },
                attributes: {
                    include: [
                        [
                            sequelize_1.sequelize.literal(`(select count(*) as quantity from orderProducts op where op.productId = Product.id order by quantity desc )`),
                            'quantity',
                        ],
                    ],
                },
            });
            const res = result
                .sort((a, b) => {
                if (Object.assign(a).dataValues.dataValues.quantity < Object.assign(b).dataValues.quantity) {
                    return 1;
                }
                if (Object.assign(a).dataValues.quantity > Object.assign(b).dataValues.quantity) {
                    return -1;
                }
                return 0;
            })
                .filter((p, index) => {
                if (index < 3) {
                    return p;
                }
            })
                .filter((p) => {
                if (p.dataValues.id == productId) {
                    return p;
                }
            });
            return res;
        });
    }
}
exports.statsRepository = new StatsRepository();
