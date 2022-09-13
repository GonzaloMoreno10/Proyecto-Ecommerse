import { Date } from 'mongoose';
import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { OrderProductsModel } from '../datasource/sequelize';
import { INewOrder, IOrder } from '../interface';
import { IOrderProduct } from '../interface/orderProduct.interface';
import { FecAlt, FecMod } from '../utils/date';

class FAORD extends Model<IOrder, INewOrder> {
  declare OrdId: CreationOptional<number>;
  declare OrdState: number;
  declare OrdUsrId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}
export const orderModel = (sequelize: any) => {
  const orderToReturn = FAORD.init(
    {
      OrdId: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      OrdState: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
      },
      OrdUsrId: {
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
      tableName: 'FAORD',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  orderToReturn.hasMany(OrderProductsModel, { foreignKey: 'OrpOrdId' });
  OrderProductsModel.belongsTo(orderToReturn, { foreignKey: 'OrpOrdId' });
  return orderToReturn;
};
