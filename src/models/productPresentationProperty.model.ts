import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ProductModel, ProductPropertyValueModel } from '../datasource/sequelize';
import {
  INewProductPresentationProperty,
  IProductPresentationProperty,
} from '../interface/productPresentationProperty.interface';
import { FecAlt, FecMod } from '../utils/date';

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
        defaultValue: FecAlt(),
      },
      updatedAt: {
        type: DataTypes.DATE(),
        allowNull: true,
        defaultValue: FecMod(),
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
          exclude: [
            'updatedAt',
            'createdAt',
            'updatedUser',
            'createdUser',
            'enabled',
            'deletedAt',
            'deletedUser',
            'ProId',
          ],
        },
      },
    }
  );
  productPresentationPropertyToReturn.belongsTo(ProductPropertyValueModel, { foreignKey: 'PreValId' });

  return productPresentationPropertyToReturn;
};
