import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { CategoryModel } from '../datasource/sequelize';
import { INewProductType, IProductType } from '../interface/productType.interface';
import { FecAlt, FecMod } from '../utils/date';

class PRTYP extends Model<IProductType, INewProductType> {
  declare TypId: CreationOptional<number>;
  declare TypName: string;
  declare TypCatId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
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
        defaultValue: FecAlt(),
      },
      updatedAt: {
        type: DataTypes.DATE(),
        allowNull: true,
        defaultValue:FecMod(),
      },
      enabled: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
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
      tableName: 'PRTYP',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  productTypeToReturn.belongsTo(CategoryModel, { foreignKey: 'TypCatId' });
  return productTypeToReturn;
};
