import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { LineModel, BrandModel, ModelModel } from '../datasource/sequelize';
import { IBrandModelLine, INewBrandModelLine } from '../interface';

class PRBML extends Model<IBrandModelLine, INewBrandModelLine> {
  declare BmlId: CreationOptional<number>;
  declare BmlBraId: number;
  declare BmlModId: number;
  declare BmlLinId: number;
  declare createdUser: number;
  declare updatedUser: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare enabled: boolean;
}

export const brandModelLineModel = (sequelize: any) => {
  const marcaModeloLineaToReturn = PRBML.init(
    {
      BmlId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      BmlBraId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      BmlModId: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
      },
      BmlLinId: {
        type: DataTypes.NUMBER,
        allowNull: true,
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
      tableName: 'PRBML',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled'],
        },
      },
    }
  );
  marcaModeloLineaToReturn.belongsTo(BrandModel, { foreignKey: 'BmlBraId' });
  marcaModeloLineaToReturn.belongsTo(ModelModel, { foreignKey: 'BmlModId' });
  marcaModeloLineaToReturn.belongsTo(LineModel, { foreignKey: 'BmlLinId' });
  return marcaModeloLineaToReturn;
};
