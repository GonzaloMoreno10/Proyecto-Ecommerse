"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.OrderProductsModel = exports.ProductModel = exports.UserModel = exports.BrandModelLineModel = exports.ProductPropertyModel = exports.ProductPropertySubItemModel = exports.ProductPresentationPropertyModel = exports.ProductPropertyValueModel = exports.LineModel = exports.ModelModel = exports.BrandModel = exports.ProductTypeModel = exports.CategoryModel = exports.ResponseModel = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../config/database.config");
const line_model_1 = require("../models/line.model");
const brandModelLine_model_1 = require("../models/brandModelLine.model");
const brands_model_1 = require("../models/brands.model");
const models_model_1 = require("../models/models.model");
const order_model_1 = require("../models/order.model");
const orderProducts_model_1 = require("../models/orderProducts.model");
const productPresentationProperty_model_1 = require("../models/productPresentationProperty.model");
const productProperty_model_1 = require("../models/productProperty.model");
const productPropertyValues_model_1 = require("../models/productPropertyValues.model");
const productType_model_1 = require("../models/productType.model");
const category_model_1 = require("../models/category.model");
const product_model_1 = require("../models/product.model");
const subProperties_model_1 = require("../models/subProperties.model");
const user_model_1 = require("../models/user.model");
const response_model_1 = require("../models/response.model");
const venv_1 = require("../constants/venv");
exports.sequelize = new sequelize_1.Sequelize(database_config_1.dbConfig.database, database_config_1.dbConfig.username, database_config_1.dbConfig.password, {
    host: database_config_1.dbConfig.host,
    port: parseInt(venv_1.MYSQL_PORT),
    dialect: 'mysql',
    pool: {
        min: 5,
        max: 30,
    },
});
exports.sequelize.authenticate().catch(err => {
    console.log('Unable to connect to the database:', err);
});
exports.ResponseModel = (0, response_model_1.responseModel)(exports.sequelize);
exports.CategoryModel = (0, category_model_1.categoryModel)(exports.sequelize);
exports.ProductTypeModel = (0, productType_model_1.productTypeModel)(exports.sequelize);
exports.BrandModel = (0, brands_model_1.brandModel)(exports.sequelize);
exports.ModelModel = (0, models_model_1.modelModel)(exports.sequelize);
exports.LineModel = (0, line_model_1.lineModel)(exports.sequelize);
exports.ProductPropertyValueModel = (0, productPropertyValues_model_1.productPropertyValues)(exports.sequelize);
exports.ProductPresentationPropertyModel = (0, productPresentationProperty_model_1.productPresentationPropertyModel)(exports.sequelize);
exports.ProductPropertySubItemModel = (0, subProperties_model_1.productPropertySubItemModel)(exports.sequelize);
exports.ProductPropertyModel = (0, productProperty_model_1.productPropertyModel)(exports.sequelize);
exports.BrandModelLineModel = (0, brandModelLine_model_1.brandModelLineModel)(exports.sequelize);
exports.UserModel = (0, user_model_1.userModel)(exports.sequelize);
exports.ProductModel = (0, product_model_1.productModel)(exports.sequelize);
exports.OrderProductsModel = (0, orderProducts_model_1.orderProductsModel)(exports.sequelize);
exports.OrderModel = (0, order_model_1.orderModel)(exports.sequelize);
