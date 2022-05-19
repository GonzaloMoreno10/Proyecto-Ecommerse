import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Line extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Line.hasMany(models.brand);
    }
  }
  Line.init(
    {
      nombre: DataTypes.STRING,
      modeloId: DataTypes.NUMBER,
      updateUser: DataTypes.NUMBER,
      craetedUser: DataTypes.NUMBER,
      enabled: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'line',
    }
  );
  return Line;
};
