import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ModelModel } from '../datasource/sequelize';
import { ILine, INewLine } from '../interface/line.interface';
import { FecAlt, FecMod } from '../utils/date';

class PRLIN extends Model<ILine, INewLine> {
  declare LinId: CreationOptional<number>;
  declare LinName: string;
  declare LinModId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}

export const lineModel = (sequelize: any) => {
  const lineaToReturn = PRLIN.init(
    {
      LinId: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      LinName: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      LinModId: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
      },
      updatedUser: {
        type: DataTypes.INTEGER(),
        allowNull: true,
      },
      createdUser: {
        type: DataTypes.INTEGER(),
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
      tableName: 'PRLIN',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  lineaToReturn.belongsTo(ModelModel, { foreignKey: 'LinModId' });
  return lineaToReturn;
};
