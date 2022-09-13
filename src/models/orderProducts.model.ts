import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ProductModel } from '../datasource/sequelize';
import { INewOrderProduct, IOrderProduct } from '../interface/orderProduct.interface';
import { FecAlt, FecMod } from '../utils/date';

class FAORP extends Model<IOrderProduct, INewOrderProduct> {
  declare OrpId: CreationOptional<number>;
  declare OrpState: number;
  declare OrpOrdId: number;
  declare OrpProId: number;
  declare OrpQuantity: number;
  declare OrpPrice: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}

export const orderProductsModel = (sequelize: any) => {
  const orderProductsToReturn = FAORP.init(
    {
      OrpId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      OrpState: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      OrpOrdId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      OrpProId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      OrpQuantity: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      OrpPrice: {
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
      tableName: 'FAORP',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  orderProductsToReturn.belongsTo(ProductModel, { foreignKey: 'OrpProId' });
  ProductModel.hasMany(FAORP, { foreignKey: 'OrpProId' });
  return orderProductsToReturn;
};
