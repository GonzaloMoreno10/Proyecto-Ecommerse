import { CreationOptional, DataTypes, InitOptions } from 'sequelize';
import { Model } from 'sequelize';
import { BrandModel } from '../datasource/sequelize';
import { IModel, INewModel } from '../interface/model.interface';

class PRMOD extends Model<IModel, INewModel> {
  declare ModId: CreationOptional<number>;
  declare ModName: string;
  declare ModBraId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
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
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'PRMOD',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled'],
        },
      },
    }
  );
  modeloToReturn.belongsTo(BrandModel, { foreignKey: 'ModBraId' });
  return modeloToReturn;
};
