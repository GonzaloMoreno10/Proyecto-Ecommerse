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
exports.statsController = void 0;
const statsRepository_1 = require("../repositories/mysql/statsRepository");
class StatsController {
    isMostSelled(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = parseInt(req.params.productId);
            return res.json(yield statsRepository_1.statsRepository.getTop3MostSelledFromProductType(productId));
        });
    }
}
exports.statsController = new StatsController();
