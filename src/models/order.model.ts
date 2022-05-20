import { Date } from 'mongoose';
import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { OrderProductsModel } from '../datasource/sequelize';
import { INewOrder, IOrder } from '../interface';

class FAORD extends Model<IOrder, INewOrder> {
  declare OrdId: CreationOptional<number>;
  declare OrdState: number;
  declare OrdUsrId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare updatedAt: Date;
  declare enabled: boolean;
}

export const orderModel = (sequelize: any) => {
  const orderToReturn = FAORD.init(
    {
      OrdId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      OrdState: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      OrdUsrId: {
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
      tableName: 'FAORD',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled'],
        },
      },
    }
  );
  orderToReturn.hasMany(OrderProductsModel, { foreignKey: 'OrpOrdId' });
  OrderProductsModel.belongsTo(orderToReturn, { foreignKey: 'OrpOrdId' });
  return orderToReturn;
};
