"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("../datasource/sequelize");
class Product extends sequelize_2.Model {
}
exports.ProductModel = Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    precio: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: true,
    },
    stock: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: false,
    },
    codigo: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    foto: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    descripcion: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: true,
    },
    categoria: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: false,
    },
    marca_id: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: false,
    },
    product_type_id: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: false,
    },
    descuento: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: true,
    },
    isOferta: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: true,
    },
    activo: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: true,
    },
    fotos: {
        type: new sequelize_1.DataTypes.ARRAY(),
        allowNull: true,
    },
    marcaModeloLineaId: {
        type: new sequelize_1.DataTypes.NUMBER(),
        allowNull: true,
    },
    sellerUser: {
        type: new sequelize_1.DataTypes.ARRAY(),
        allowNull: false,
    },
}, {
    tableName: 'products',
    sequelize: sequelize_3.sequelize, // passing the `sequelize` instance is required
});
