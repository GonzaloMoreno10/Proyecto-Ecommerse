import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Category.hasMany(models.productType, { foreignKey: 'categoryId' });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      createdUser: DataTypes.INTEGER,
      updatedUser: DataTypes.INTEGER,
      enabled: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'category',
    }
  );
  return Category;
};
