import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ProductPropertyValueModel } from '../datasource/sequelize';
import { INewProductPropertySubItem, IProductPropertySubItem } from '../interface/productPropertySubItem.interface';

class PPSUI extends Model<IProductPropertySubItem, INewProductPropertySubItem> {
  declare SuiId: CreationOptional<number>;
  declare SuiProId: number;
  declare SuiName: string;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
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
        allowNull: false,
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
    },
    {
      timestamps: false,
      tableName: 'PPSUI',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled'],
        },
      },
    }
  );

  productPropertiesSubItemModelToReturn.hasMany(ProductPropertyValueModel, { foreignKey: 'ValSuiId' });
  return productPropertiesSubItemModelToReturn;
};
