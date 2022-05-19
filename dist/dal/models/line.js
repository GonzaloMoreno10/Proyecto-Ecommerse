"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Line extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Line.hasMany(models.brand);
        }
    }
    Line.init({
        nombre: DataTypes.STRING,
        modeloId: DataTypes.NUMBER,
        updateUser: DataTypes.NUMBER,
        craetedUser: DataTypes.NUMBER,
        enabled: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'line',
    });
    return Line;
};
