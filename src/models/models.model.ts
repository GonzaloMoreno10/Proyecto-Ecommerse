import { CreationOptional, DataTypes, InitOptions } from 'sequelize';
import { Model } from 'sequelize';
import { BrandModel } from '../datasource/sequelize';
import { IModel, INewModel } from '../interface/model.interface';
import { FecAlt, FecMod } from '../utils/date';

class PRMOD extends Model<IModel, INewModel> {
  declare ModId: CreationOptional<number>;
  declare ModName: string;
  declare ModBraId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}

export const modelModel = (sequelize: any) => {
  const modeloToReturn = PRMOD.init(
    {
      ModId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      ModName: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      ModBraId: {
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
        defaultValue:FecMod()
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
      tableName: 'PRMOD',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  modeloToReturn.belongsTo(BrandModel, { foreignKey: 'ModBraId' });
  return modeloToReturn;
};
