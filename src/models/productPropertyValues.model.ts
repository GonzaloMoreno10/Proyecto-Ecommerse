import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { INewProductPropertyValue, IProductPropertyValue } from '../interface/productPropertyValue.interface';
import { FecAlt, FecMod } from '../utils/date';

class PPVAL extends Model<IProductPropertyValue, INewProductPropertyValue> {
  declare ValId: CreationOptional<number>;
  declare ValName: string;
  declare ValDesc: string;
  declare ValSuiId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}

export const productPropertyValues = (sequelize: any) => {
  const productPropertyValueToReturn = PPVAL.init(
    {
      ValId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      ValName: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      ValDesc: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      ValSuiId: {
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
      tableName: 'PPVAL',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  return productPropertyValueToReturn;
};
