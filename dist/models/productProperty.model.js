"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPropertyModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class PPPRO extends sequelize_2.Model {
}
const productPropertyModel = (sequelize) => {
    const productPropertiesModelToReturn = PPPRO.init({
        ProId: {
            type: sequelize_1.DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        ProTypId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        ProCatId: {
            type: new sequelize_1.DataTypes.NUMBER(),
            allowNull: false,
        },
        ProName: {
            type: new sequelize_1.DataTypes.STRING(),
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
        tableName: 'PPPRO',
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
            },
        },
    });
    productPropertiesModelToReturn.hasMany(sequelize_3.ProductPropertySubItemModel, { foreignKey: 'SuiProId' });
    productPropertiesModelToReturn.belongsTo(sequelize_3.CategoryModel, { foreignKey: 'ProCatId' });
    productPropertiesModelToReturn.belongsTo(sequelize_3.ProductTypeModel, { foreignKey: 'ProTypId' });
    // productPropertiesModelToReturn.hasMany(ProductPropertyValueModel, { foreignKey: 'productPropertieValueId' });
    return productPropertiesModelToReturn;
};
exports.productPropertyModel = productPropertyModel;
