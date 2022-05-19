"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPropertyValues = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class PPVAL extends sequelize_2.Model {
}
const productPropertyValues = (sequelize) => {
    const productPropertyValueToReturn = PPVAL.init({
        ValId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        ValName: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        ValDesc: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        ValSuiId: {
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
        tableName: 'PPVAL',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    return productPropertyValueToReturn;
};
exports.productPropertyValues = productPropertyValues;
