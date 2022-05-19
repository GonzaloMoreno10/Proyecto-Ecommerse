import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Models.hasMany(models.BrandModelLine, { foreignKey: 'brandId' });
    }
  }
  Models.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      createdUser: DataTypes.INTEGER,
      updatedUser: DataTypes.INTEGER,
      enabled: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'model',
    }
  );
  return Models;
};
