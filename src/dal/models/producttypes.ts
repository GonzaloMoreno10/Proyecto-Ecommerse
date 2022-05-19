import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      ProductType.belongsTo(models.category, { foreignKey: 'categoryId' });
    }
  }
  ProductType.init(
    {
      name: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      createdUser: DataTypes.INTEGER,
      updatedUser: DataTypes.INTEGER,
      enabled: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'productType',
    }
  );
  return ProductType;
};
