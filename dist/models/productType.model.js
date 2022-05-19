"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class PRTYP extends sequelize_2.Model {
}
const productTypeModel = (sequelize) => {
    const productTypeToReturn = PRTYP.init({
        TypId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        TypName: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        TypCatId: {
            type: new sequelize_1.DataTypes.INTEGER(),
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
        tableName: 'PRTYP',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    productTypeToReturn.belongsTo(sequelize_3.CategoryModel, { foreignKey: 'TypCatId' });
    return productTypeToReturn;
};
exports.productTypeModel = productTypeModel;
