import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import {
  CategoryModel,
  ProductPropertySubItemModel,
  ProductPropertyValueModel,
  ProductTypeModel,
} from '../datasource/sequelize';
import { INewProductProperty, IProductProperty } from '../interface/productProperty.interface';
import { FecAlt, FecMod } from '../utils/date';

class PPPRO extends Model<IProductProperty, INewProductProperty> {
  declare ProId: CreationOptional<number>;
  declare ProTypId: number;
  declare ProCatId: number;
  declare ProName: string;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}

export const productPropertyModel = (sequelize: any) => {
  const productPropertiesModelToReturn = PPPRO.init(
    {
      ProId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      ProTypId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      ProCatId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      ProName: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      updatedUser: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      createdUser: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE(),
        allowNull: true,
        defaultValue: FecAlt(),
      },
      updatedAt: {
        type: DataTypes.DATE(),
        allowNull: true,
        defaultValue:FecMod(),
      },
      enabled: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE(),
        allowNull: true,
      },
      deletedUser: {
        type: DataTypes.INTEGER(),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'PPPRO',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  productPropertiesModelToReturn.hasMany(ProductPropertySubItemModel, { foreignKey: 'SuiProId' });
  productPropertiesModelToReturn.belongsTo(CategoryModel, { foreignKey: 'ProCatId' });
  productPropertiesModelToReturn.belongsTo(ProductTypeModel, { foreignKey: 'ProTypId' });
  // productPropertiesModelToReturn.hasMany(ProductPropertyValueModel, { foreignKey: 'productPropertieValueId' });
  return productPropertiesModelToReturn;
};
