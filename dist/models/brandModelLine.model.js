"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandModelLineModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class PRBML extends sequelize_2.Model {
}
const brandModelLineModel = (sequelize) => {
    const marcaModeloLineaToReturn = PRBML.init({
        BmlId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        BmlBraId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        BmlModId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        BmlLinId: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: true,
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
        tableName: 'PRBML',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    marcaModeloLineaToReturn.belongsTo(sequelize_3.BrandModel, { foreignKey: 'BmlBraId' });
    marcaModeloLineaToReturn.belongsTo(sequelize_3.ModelModel, { foreignKey: 'BmlModId' });
    marcaModeloLineaToReturn.belongsTo(sequelize_3.LineModel, { foreignKey: 'BmlLinId' });
    return marcaModeloLineaToReturn;
};
exports.brandModelLineModel = brandModelLineModel;
