"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class User extends sequelize_2.Model {
}
const userModel = (sequelize) => {
    const userModelToReturn = User.init({
        UsrId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        UsrEmail: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        UsrPass: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        UsrName: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        UsrAddress: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        UsrBirthDate: {
            type: new sequelize_1.DataTypes.DATE(),
            allowNull: false,
        },
        UsrAvatar: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: true,
        },
        UsrRolId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: true,
        },
        UsrDoc: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        UsrDocType: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        UsrPhone: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: true,
        },
        UsrVerfied: {
            type: new sequelize_1.DataTypes.BOOLEAN(),
            allowNull: false,
        },
        UsrValidCod: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: true,
        },
        updatedUser: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: true,
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
            allowNull: true,
            defaultValue: true,
        },
    }, {
        timestamps: false,
        tableName: 'PEUSR',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    return userModelToReturn;
};
exports.userModel = userModel;
