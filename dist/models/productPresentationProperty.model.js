"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPresentationPropertyModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class PPPRE extends sequelize_2.Model {
}
const productPresentationPropertyModel = (sequelize) => {
    const productPresentationPropertyToReturn = PPPRE.init({
        PreId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        PreProId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        PreValId: {
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
        tableName: 'PPPRE',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    sequelize_3.ProductPropertyValueModel.hasMany(productPresentationPropertyToReturn, { foreignKey: 'PreValId' });
    productPresentationPropertyToReturn.belongsTo(sequelize_3.ProductPropertyValueModel, { foreignKey: 'PreValId' });
    return productPresentationPropertyToReturn;
};
exports.productPresentationPropertyModel = productPresentationPropertyModel;
