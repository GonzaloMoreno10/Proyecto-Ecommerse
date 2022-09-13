import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/database.config';
import { lineModel } from '../models/line.model';
import { brandModelLineModel } from '../models/brandModelLine.model';
import { brandModel } from '../models/brands.model';
import { modelModel } from '../models/models.model';
import { orderModel } from '../models/order.model';
import { orderProductsModel } from '../models/orderProducts.model';
import { productPresentationPropertyModel } from '../models/productPresentationProperty.model';
import { productPropertyModel } from '../models/productProperty.model';
import { productPropertyValues } from '../models/productPropertyValues.model';
import { productTypeModel } from '../models/productType.model';
import { categoryModel } from '../models/category.model';
import { productModel } from '../models/product.model';
import { productPropertySubItemModel } from '../models/subProperties.model';
import { userModel } from '../models/user.model';
import { responseModel } from '../models/response.model';
import { MYSQL_PORT } from '../constants/venv';
import { prProPreModel } from '../models/prpropre.model';
export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: parseInt(MYSQL_PORT),
  dialect: 'mysql',
  pool: {
    min: 5,
    max: 30,
  },
});

sequelize.authenticate().catch(err => {
  console.log('Unable to connect to the database:', err);
});

export const ResponseModel = responseModel(sequelize);
export const CategoryModel = categoryModel(sequelize);
export const ProductTypeModel = productTypeModel(sequelize);
export const BrandModel = brandModel(sequelize);
export const ModelModel = modelModel(sequelize);
export const LineModel = lineModel(sequelize);
export const ProductPropertyValueModel = productPropertyValues(sequelize);
export const ProductPresentationPropertyModel = productPresentationPropertyModel(sequelize);
export const ProductPropertySubItemModel = productPropertySubItemModel(sequelize);
export const ProductPropertyModel = productPropertyModel(sequelize);
export const BrandModelLineModel = brandModelLineModel(sequelize);
export const UserModel = userModel(sequelize);
export const PrProPreModel = prProPreModel(sequelize);
export const ProductModel = productModel(sequelize);
export const OrderProductsModel = orderProductsModel(sequelize);
export const OrderModel = orderModel(sequelize);
