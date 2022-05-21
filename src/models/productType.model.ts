import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { CategoryModel } from '../datasource/sequelize';
import { INewProductType, IProductType } from '../interface/productType.interface';

class PRTYP extends Model<IProductType, INewProductType> {
  declare TypId: CreationOptional<number>;
  declare TypName: string;
  declare TypCatId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
}

export const productTypeModel = (sequelize: any) => {
  const productTypeToReturn = PRTYP.init(
    {
      TypId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      TypName: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      TypCatId: {
        type: new DataTypes.INTEGER(),
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
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'PRTYP',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled'],
        },
      },
    }
  );
  productTypeToReturn.belongsTo(CategoryModel, { foreignKey: 'TypCatId' });
  return productTypeToReturn;
};
