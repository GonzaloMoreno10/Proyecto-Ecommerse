import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import {
  CategoryModel,
  BrandModel,
  BrandModelLineModel,
  ProductPresentationPropertyModel,
  ProductTypeModel,
} from '../datasource/sequelize';
import { IProduct, INewProduct } from '../interface';

class PRPRO extends Model<IProduct, INewProduct> {
  declare ProId: CreationOptional<number>;
  declare ProName: string;
  declare ProPrice: string;
  declare ProStock: number;
  declare ProCod: number;
  declare ProDesc: string;
  declare ProCatId: number;
  declare ProTypId: number;
  declare ProIsOffer: number;
  declare ProDiscount: number;
  declare ProImgs: string[];
  declare ProBmlId: number;
  declare ProUsrId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
  declare deletedAt: Date;
  declare deletedUser: number;
}

export const productModel = (sequelize: any) => {
  const prodToReturn = PRPRO.init(
    {
      ProId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      ProName: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      ProPrice: {
        type: new DataTypes.NUMBER(),
        allowNull: true,
      },
      ProStock: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      ProCod: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      ProDesc: {
        type: new DataTypes.STRING(),
        allowNull: true,
      },
      ProCatId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      ProTypId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      ProDiscount: {
        type: new DataTypes.NUMBER(),
        allowNull: true,
      },
      ProIsOffer: {
        type: new DataTypes.NUMBER(),
        allowNull: true,
      },
      ProImgs: {
        type: new DataTypes.STRING(),
        allowNull: true,
      },
      ProBmlId: {
        type: new DataTypes.NUMBER(),
        allowNull: true,
      },
      ProUsrId: {
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
      tableName: 'PRPRO',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled', 'deletedAt', 'deletedUser'],
        },
      },
    }
  );
  prodToReturn.belongsTo(ProductTypeModel, {
    foreignKey: 'ProTypId',
  });

  prodToReturn.hasMany(ProductPresentationPropertyModel, {
    foreignKey: 'ProId',
  });

  prodToReturn.belongsTo(CategoryModel, {
    foreignKey: 'ProCatId',
  });
  prodToReturn.belongsTo(BrandModelLineModel, { foreignKey: 'ProBmlId' });
  return prodToReturn;
};
