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
const mysql_1 = require("../../services/mysql");
class StatsRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    getTop3MostSelledFromProductType(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select t2.* from products p
    join (
    select p.id,p.nombre aspNombre,pt.id as ptId,pt.nombre as ptNombre,t1.cantidad from products p 
    join product_types pt on pt.id = p.product_type_id 
    join(
    select count(*) as cantidad,p.id,pt.id as ptId from orderProducts op 
    join products p on p.id = op.productId 
    join product_types pt on pt.id = p.product_type_id 
    group by p.id,pt.id
    order by pt.id,cantidad desc) t1 on p.id = t1.id and p.product_type_id = t1.ptId) t2 on t2.id = p.id and t2.ptId = p.product_type_id 
    where p.id = ${productId}
    and t2.cantidad = (select count(*) as cantidad from orderProducts op 
    join products px on px.id = op.productId 
    join product_types ptx on ptx.id = px.product_type_id 
    where ptx.id = p.product_type_id 
    group by px.id,ptx.id
    order by cantidad desc limit 1)`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
}
exports.statsRepository = new StatsRepository();
