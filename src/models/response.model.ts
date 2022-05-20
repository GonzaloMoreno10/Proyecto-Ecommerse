import { CreationOptional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';

import { IResponses, INewResponse } from '../interface/responses.interface';

class APRES extends Model<IResponses, INewResponse> {
  declare resId: CreationOptional<number>;
  declare resDesc: string;
  declare resIsError: boolean;
  declare resCod: number;
}

export const responseModel = (sequelize: any) => {
  const responseModelToReturn = APRES.init(
    {
      resId: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      resDesc: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      resIsError: {
        type: new DataTypes.BOOLEAN(),
        allowNull: false,
      },
      resCod: {
        type: new DataTypes.INTEGER(),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'APRES',
      sequelize, // passing the `sequelize` instance is required
      defaultScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'updatedUser', 'createdUser', 'enabled'],
        },
      },
    }
  );

  return responseModelToReturn;
};
