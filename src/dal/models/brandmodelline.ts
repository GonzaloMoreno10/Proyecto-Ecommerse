import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class BrandModelLine extends Model {
    static associate(models: any) {
      BrandModelLine.belongsTo(models.brands, {
        foreignKey: 'brandId',
      });
      BrandModelLine.belongsTo(models.models, { foreignKey: 'modelId' });
      BrandModelLine.belongsTo(models.lines, { foreignKey: 'lineId' });
    }
  }
  BrandModelLine.init(
    {
      brandId: DataTypes.INTEGER,
      modelId: DataTypes.INTEGER,
      lineId: DataTypes.INTEGER,
      createdUser: DataTypes.INTEGER,
      updatedUser: DataTypes.INTEGER,
      enabled: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'brandModelLine',
    }
  );
  return BrandModelLine;
};
