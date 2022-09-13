import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ProductPropertyValueModel } from '../datasource/sequelize';
import { INewProductPropertySubItem, IProductPropertySubItem } from '../interface/productPropertySubItem.interface';
import { FecAlt, FecMod } from '../utils/date';

class PPSUI extends Model<IProductPropertySubItem, INewProductPropertySubItem> {
  declare SuiId: CreationOptional<number>;
  declare SuiProId: number;
  declare SuiName: string;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}

export const productPropertySubItemModel = (sequelize: any) => {
  const productPropertiesSubItemModelToReturn = PPSUI.init(
    {
      SuiId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      SuiProId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      SuiName: {
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
      tableName: 'PPSUI',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );

  productPropertiesSubItemModelToReturn.hasMany(ProductPropertyValueModel, { foreignKey: 'ValSuiId' });
  return productPropertiesSubItemModelToReturn;
};
