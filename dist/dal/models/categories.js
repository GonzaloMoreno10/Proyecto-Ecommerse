"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Category.hasMany(models.productType, { foreignKey: 'categoryId' });
        }
    }
    Category.init({
        name: DataTypes.STRING,
        createdUser: DataTypes.INTEGER,
        updatedUser: DataTypes.INTEGER,
        enabled: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'category',
    });
    return Category;
};
