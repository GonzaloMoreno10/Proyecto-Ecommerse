import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ProductTypeModel } from '../datasource/sequelize';
import { IBrand, INewBrand } from '../interface/brand.model';

class PRBRA extends Model<IBrand, INewBrand> {
  declare BraId: CreationOptional<number>;
  declare BraName: string;
  declare BraTypId: number;
  declare BraImg: string;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
}

export const brandModel = (sequelize: any) => {
  const marcaToReturn = PRBRA.init(
    {
      BraId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      BraName: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      BraTypId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      BraImg: {
        type: DataTypes.STRING,
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
      tableName: 'PRBRA',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
        },
      },
    }
  );
  marcaToReturn.belongsTo(ProductTypeModel, { foreignKey: 'BraModId' });
  return marcaToReturn;
};
