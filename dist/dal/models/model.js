"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Models extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Models.hasMany(models.BrandModelLine, { foreignKey: 'brandId' });
        }
    }
    Models.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        createdUser: DataTypes.INTEGER,
        updatedUser: DataTypes.INTEGER,
        enabled: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'model',
    });
    return Models;
};
