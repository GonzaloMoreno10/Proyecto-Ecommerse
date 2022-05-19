"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class PRPRO extends sequelize_2.Model {
}
const productModel = (sequelize) => {
    const prodToReturn = PRPRO.init({
        ProId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        ProName: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: false,
        },
        ProPrice: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: true,
        },
        ProStock: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        ProCod: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false,
        },
        ProDesc: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: true,
        },
        ProCatId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        ProBraId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        ProTypId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        ProDiscount: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: true,
        },
        ProIsOffer: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: true,
        },
        ProImgs: {
            type: new sequelize_1.DataTypes.STRING(),
            allowNull: true,
        },
        ProBmlId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: true,
        },
        ProUsrId: {
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
        tableName: 'PRPRO',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    prodToReturn.belongsTo(sequelize_3.ProductTypeModel, {
        foreignKey: 'ProTypId',
    });
    prodToReturn.hasMany(sequelize_3.ProductPresentationPropertyModel, {
        foreignKey: 'ProId',
    });
    prodToReturn.belongsTo(sequelize_3.CategoryModel, {
        foreignKey: 'ProCatId',
    });
    prodToReturn.belongsTo(sequelize_3.BrandModelLineModel, { foreignKey: 'ProBmlId' });
    prodToReturn.belongsTo(sequelize_3.BrandModel, { foreignKey: 'ProBraId' });
    return prodToReturn;
};
exports.productModel = productModel;
