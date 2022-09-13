import { DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { IPRPROPRE } from '../interface/prpropre.interface';

class PRPROPRE extends Model<IPRPROPRE, IPRPROPRE> {
  declare PropertyId: number;
  declare PropertyName: string;
  declare IsGeneric: boolean;
  declare SubPropertyId: number;
  declare SubPropertyName: string;
  declare ValueId: number;
  declare ValueName: string;
  declare ValueDescription: string;
  declare ProductId: number;
}

export const prProPreModel = (sequelize: any) => {
  const PrProPreToReturn = PRPROPRE.init(
    {
      PropertyId: {
        type: DataTypes.NUMBER,
      },
      PropertyName: {
        type: DataTypes.STRING(),
      },
      IsGeneric: {
        type: DataTypes.BOOLEAN(),
      },
      SubPropertyId: {
        type: DataTypes.NUMBER,
      },
      SubPropertyName: {
        type: DataTypes.STRING,
      },
      ValueId: {
        type: DataTypes.NUMBER,
      },
      ValueName: {
        type: DataTypes.STRING,
      },
      ValueDescription: {
        type: DataTypes.STRING,
      },
      ProductId: {
        type: DataTypes.NUMBER,
      },
    },
    {
      timestamps: false,
      tableName: 'PRPROPRE',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['id'],
        },
      },
    }
  );
  return PrProPreToReturn;
};
