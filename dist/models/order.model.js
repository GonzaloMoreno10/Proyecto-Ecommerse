"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class FAORD extends sequelize_2.Model {
}
const orderModel = (sequelize) => {
    const orderToReturn = FAORD.init({
        OrdId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        OrdState: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        OrdUsrId: {
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
        tableName: 'FAORD',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    orderToReturn.hasMany(sequelize_3.OrderProductsModel, { foreignKey: 'OrpOrdId' });
    sequelize_3.OrderProductsModel.belongsTo(orderToReturn, { foreignKey: 'OrpOrdId' });
    return orderToReturn;
};
exports.orderModel = orderModel;
