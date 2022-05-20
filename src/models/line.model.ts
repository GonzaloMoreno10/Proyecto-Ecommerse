import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ModelModel } from '../datasource/sequelize';
import { ILine, INewLine } from '../interface/line.interface';

class PRLIN extends Model<ILine, INewLine> {
  declare LinId: CreationOptional<number>;
  declare LinName: string;
  declare LinModId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
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
      tableName: 'PRLIN',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled'],
        },
      },
    }
  );
  lineaToReturn.belongsTo(ModelModel, { foreignKey: 'LinModId' });
  return lineaToReturn;
};
