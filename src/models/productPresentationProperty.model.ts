import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ProductPropertyValueModel } from '../datasource/sequelize';
import {
  INewProductPresentationProperty,
  IProductPresentationProperty,
} from '../interface/productPresentationProperty.interface';

class PPPRE extends Model<IProductPresentationProperty, INewProductPresentationProperty> {
  declare PreId: CreationOptional<number>;
  declare PreProId: number;
  declare PreValId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}

export const productPresentationPropertyModel = (sequelize: any) => {
  const productPresentationPropertyToReturn = PPPRE.init(
    {
      PreId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      PreProId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      PreValId: {
        type: new DataTypes.NUMBER(),
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
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE(),
        allowNull: true,
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
      tableName: 'PPPRE',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  ProductPropertyValueModel.hasMany(productPresentationPropertyToReturn, { foreignKey: 'PreValId' });
  productPresentationPropertyToReturn.belongsTo(ProductPropertyValueModel, { foreignKey: 'PreValId' });
  return productPresentationPropertyToReturn;
};
