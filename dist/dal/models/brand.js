"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Brand extends sequelize_1.Model {
        static associate(models) { }
    }
    Brand.init({
        name: DataTypes.STRING,
        productTypeId: DataTypes.INTEGER,
        image: DataTypes.INTEGER,
        createdUser: DataTypes.INTEGER,
        updatedUser: DataTypes.INTEGER,
        enabled: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'brand',
    });
    return Brand;
};
