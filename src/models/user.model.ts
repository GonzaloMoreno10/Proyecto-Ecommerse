import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { INewUser, IUser } from '../interface';

class User extends Model<IUser, INewUser> {
  declare UsrId: CreationOptional<number>;
  declare UsrEmail: string;
  declare UsrPass: string;
  declare UsrName: string;
  declare UsrAddress: string;
  declare UsrBirthDate: Date;
  declare UsrPhone: string;
  declare UsrAvatar: string;
  declare UsrRolId: number;
  declare UsrDoc: number;
  declare UsrDocType: number;
  declare UsrVerified: boolean;
  declare UsrValidCod: boolean;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
}

export const userModel = (sequelize: any) => {
  const userModelToReturn = User.init(
    {
      UsrId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      UsrEmail: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      UsrPass: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      UsrName: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      UsrAddress: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      UsrBirthDate: {
        type: new DataTypes.DATE(),
        allowNull: false,
      },
      UsrAvatar: {
        type: new DataTypes.STRING(),
        allowNull: true,
      },
      UsrRolId: {
        type: new DataTypes.NUMBER(),
        allowNull: true,
      },
      UsrDoc: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      UsrDocType: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      UsrPhone: {
        type: new DataTypes.STRING(),
        allowNull: true,
      },
      UsrVerfied: {
        type: new DataTypes.BOOLEAN(),
        allowNull: false,
      },
      UsrValidCod: {
        type: new DataTypes.STRING(),
        allowNull: true,
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
      tableName: 'PEUSR',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
        },
      },
    }
  );
  return userModelToReturn;
};
