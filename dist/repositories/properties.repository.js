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
const { Op } = require('sequelize');
const sequelize_1 = require("../datasource/sequelize");
const mysql_service_1 = require("../services/mysql.service");
class PropertiesRepository {
    constructor() {
        this.connection = mysql_service_1.mysqlDataSource.connection();
    }
    getPropertyByid(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sequelize_1.ProductPropertyModel.findOne({ where: { ProId: propertyId } });
                return result;
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
    setPropertie(property) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into properties (productTypeId,categoryId,propertyName) values(${property.ProTypId},${property.ProCatId},${property.ProName} )`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    getPropertiesByProductType(productTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.ProductPropertyModel.findAll({
                where: { ProTypId: productTypeId },
                attributes: { exclude: ['productPropertieValueId'] },
                include: [
                    {
                        model: sequelize_1.ProductPropertySubItemModel,
                        required: true,
                        attributes: { exclude: ['productPropertieValueId'] },
                        include: [
                            { model: sequelize_1.ProductPropertyValueModel, required: true, attributes: { exclude: ['productPropertieValueId'] } },
                        ],
                    },
                ],
            });
            return result;
        });
    }
    getProductPresentationPropertiesByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.ProductPresentationPropertyModel.findAll({ where: { PreProId: productId } });
            return result;
        });
    }
    setProperty(property) {
        return __awaiter(this, void 0, void 0, function* () {
            const productPropertySql = `insert into productProperties (productTypeId,categoryId,propertyName) values(${property.productTypeId},${property.categoryId},'${property.propertyName}')`;
            const productProperty = yield this.connection.query(productPropertySql);
            if (Object.assign(productProperty[0]).insertId) {
                for (let i in property.subProperties) {
                    const subPropertySql = `insert into productPropertiesSubItems (productPropertyId,subPropertyName) values(${Object.assign(productProperty[0]).insertId},'${property.subProperties[i].name}')`;
                    const subPropertyResult = yield this.connection.query(subPropertySql);
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
            const result = yield sequelize_1.ProductPropertySubItemModel.findAll({ where: { SuiProId: propertyId } });
            return result;
        });
    }
    getSubPropertiesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.ProductPropertySubItemModel.findAll({ where: { SuiId: id } });
            return result;
        });
    }
    getPropertiesByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.ProductPropertyModel.findAll({
                attributes: { exclude: ['ProTypId', 'ProCatId'] },
                include: [
                    {
                        model: sequelize_1.ProductPropertySubItemModel,
                        attributes: { exclude: ['SuiProId'] },
                        required: true,
                        include: [
                            {
                                model: sequelize_1.ProductPropertyValueModel,
                                required: true,
                                attributes: {
                                    exclude: [
                                        // 'productPropertieValueId',
                                        'ValSuiId',
                                        'description',
                                    ],
                                },
                                include: [
                                    {
                                        model: sequelize_1.ProductPresentationPropertyModel,
                                        attributes: { exclude: ['PreId', 'PreValId', 'ProId'] },
                                        required: true,
                                        where: { PreProId: productId },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            return result;
        });
    }
    getProductPropertieValues(subPropId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.ProductPropertyValueModel.findAll({ where: { ValSuiId: subPropId } });
            return result;
        });
    }
    setPropertySubItems(subProperty) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into productPropertiesSubItems (productPropertyId,subPropertyName) values(${subProperty.SuiProId},${subProperty.SuiName} )`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    setProductPresentationProperty(ppp) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into productPresentationPropertie (productId,productPropertieValueId) values(${ppp.PreProId},${ppp.PreValId} )`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
}
exports.propertiesRepository = new PropertiesRepository();
