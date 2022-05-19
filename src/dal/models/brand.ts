import { Model } from 'sequelize';
import { IBrand2, INewBrand2 } from '../../interface/brand.model';
module.exports = (sequelize: any, DataTypes: any) => {
  class Brand extends Model<IBrand2, INewBrand2> {
    static associate(models: any) {}
  }
  Brand.init(
    {
      name: DataTypes.STRING,
      productTypeId: DataTypes.INTEGER,
      image: DataTypes.INTEGER,
      createdUser: DataTypes.INTEGER,
      updatedUser: DataTypes.INTEGER,
      enabled: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'brand',
    }
  );
  return Brand;
};
