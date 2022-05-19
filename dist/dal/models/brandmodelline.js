"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BrandModelLine extends sequelize_1.Model {
        static associate(models) {
            BrandModelLine.belongsTo(models.brands, {
                foreignKey: 'brandId',
            });
            BrandModelLine.belongsTo(models.models, { foreignKey: 'modelId' });
            BrandModelLine.belongsTo(models.lines, { foreignKey: 'lineId' });
        }
    }
    BrandModelLine.init({
        brandId: DataTypes.INTEGER,
        modelId: DataTypes.INTEGER,
        lineId: DataTypes.INTEGER,
        createdUser: DataTypes.INTEGER,
        updatedUser: DataTypes.INTEGER,
        enabled: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'brandModelLine',
    });
    return BrandModelLine;
};
