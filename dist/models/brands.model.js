"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class PRBRA extends sequelize_2.Model {
}
const brandModel = (sequelize) => {
    const marcaToReturn = PRBRA.init({
        BraId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        BraName: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        BraTypId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        BraImg: {
            type: sequelize_1.DataTypes.STRING,
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
        tableName: 'PRBRA',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    marcaToReturn.belongsTo(sequelize_3.ProductTypeModel, { foreignKey: 'BraModId' });
    return marcaToReturn;
};
exports.brandModel = brandModel;
