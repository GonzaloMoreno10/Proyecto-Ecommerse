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
exports.propertiesRepository = void 0;
const mysql_1 = require("../../services/mysql");
class PropertiesRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    getPropertyByid(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `select * from  productProperties where id = ${propertyId}`;
                const result = yield this.connection.query(sql);
                return result[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    setPropertyValue(propertyValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `insert into productPropertieValues (value,productPropertieSubItemId) values('${propertyValue.value}',${propertyValue.id})`;
                const result = yield this.connection.query(sql);
                return result[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    setPropertie(propertie) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into properties (productTypeId,categoryId,propertyName) values(${propertie.productTypeId},${propertie.categoryId},${propertie.propertyName} )`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    getPropertiesByProductType(productTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select id,propertyName,isGeneric from productProperties where productTypeid = ${productTypeId}`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    setProperty(property) {
        return __awaiter(this, void 0, void 0, function* () {
            const productPropertySql = `insert into productProperties (productTypeId,categoryId,propertyName) values(${property.productTypeId},${property.categoryId},'${property.propertyName}')`;
            const productProperty = yield this.connection.query(productPropertySql);
            console.log(Object.assign(productProperty[0]).insertId);
            if (Object.assign(productProperty[0]).insertId) {
                for (let i in property.subProperties) {
                    const subPropertySql = `insert into productPropertiesSubItems (productPropertyId,subPropertyName) values(${Object.assign(productProperty[0]).insertId},'${property.subProperties[i].name}')`;
                    const subPropertyResult = yield this.connection.query(subPropertySql);
                    console.log(Object.assign(subPropertyResult[0]).insertId);
                    if (Object.assign(subPropertyResult[0]).insertId) {
                        const productPropertieValuesSql = `insert into productPropertieValues (value,productPropertieSubItemId) values('${property.subProperties[i].value}',${Object.assign(subPropertyResult[0]).insertId})`;
                        yield this.connection.query(productPropertieValuesSql);
                    }
                }
                return Object.assign(productProperty[0]).insertId;
            }
        });
    }
    deletePropertiesByProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `delete from productPresentationPropertie where productId = ${productId}`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    getSubProperties(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select id, subPropertyName from productPropertiesSubItems where productPropertyId = ${propertyId}`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    getProductPropertieValues(subPropId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select id,value from productPropertieValues where productPropertieSubItemId = ${subPropId}`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    setPropertySubItems(subProperty) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into productPropertiesSubItems (productPropertyId,subPropertyName) values(${subProperty.productPropertyId},${subProperty.subPropertyName} )`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    setProductPresentationProperty(ppp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ppp);
            const sql = `insert into productPresentationPropertie (productId,productPropertieValueId) values(${ppp.productId},${ppp.productPropertieValueId} )`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
}
exports.propertiesRepository = new PropertiesRepository();
