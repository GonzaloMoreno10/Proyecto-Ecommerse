import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { ProductModel } from '../datasource/sequelize';
import { INewOrderProduct, IOrderProduct } from '../interface/orderProduct.interface';

class FAORP extends Model<IOrderProduct, INewOrderProduct> {
  declare OrpId: CreationOptional<number>;
  declare OrpState: number;
  declare OrpOrdid: number;
  declare OrpProId: number;
  declare OrpQuantity: number;
  declare OrpPrice: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
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
      tableName: 'FAORP',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser'],
        },
      },
    }
  );
  orderProductsToReturn.belongsTo(ProductModel, { foreignKey: 'OrpProId' });
  ProductModel.hasMany(FAORP, { foreignKey: 'OrpProId' });
  return orderProductsToReturn;
};
