"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProductsModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class FAORP extends sequelize_2.Model {
}
const orderProductsModel = (sequelize) => {
    const orderProductsToReturn = FAORP.init({
        OrpId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        OrpState: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        OrpOrdId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        OrpProId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        OrpQuantity: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        OrpPrice: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        updatedUser: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false,
        },
        createdUser: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE(),
            allowNull: true,
            defaultValue: new Date(),
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE(),
            allowNull: true,
        },
        enabled: {
            type: sequelize_1.DataTypes.BOOLEAN(),
            allowNull: false,
            defaultValue: true,
        },
    }, {
        timestamps: false,
        tableName: 'FAORP',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    orderProductsToReturn.belongsTo(sequelize_3.ProductModel, { foreignKey: 'OrpProId' });
    sequelize_3.ProductModel.hasMany(FAORP, { foreignKey: 'OrpProId' });
    return orderProductsToReturn;
};
exports.orderProductsModel = orderProductsModel;
