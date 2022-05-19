"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPropertySubItemModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class PPSUI extends sequelize_2.Model {
}
const productPropertySubItemModel = (sequelize) => {
    const productPropertiesSubItemModelToReturn = PPSUI.init({
        SuiId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        SuiProId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        SuiName: {
            type: new sequelize_1.DataTypes.STRING(),
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
        tableName: 'PPSUI',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    productPropertiesSubItemModelToReturn.hasMany(sequelize_3.ProductPropertyValueModel, { foreignKey: 'ValSuiId' });
    return productPropertiesSubItemModelToReturn;
};
exports.productPropertySubItemModel = productPropertySubItemModel;
