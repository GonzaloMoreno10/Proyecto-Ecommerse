import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { INewProductPropertyValue, IProductPropertyValue } from '../interface/productPropertyValue.interface';

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
      tableName: 'PPVAL',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled'],
        },
      },
    }
  );
  return productPropertyValueToReturn;
};
