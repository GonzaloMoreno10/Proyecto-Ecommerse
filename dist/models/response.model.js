"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class APRES extends sequelize_2.Model {
}
const responseModel = (sequelize) => {
    const responseModelToReturn = APRES.init({
        resId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        resDesc: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        resIsError: {
            type: new sequelize_1.DataTypes.BOOLEAN(),
            allowNull: false,
        },
        resCod: {
            type: new sequelize_1.DataTypes.INTEGER(),
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: 'APRES',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    return responseModelToReturn;
};
exports.responseModel = responseModel;
