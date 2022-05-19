import { ProductModel, sequelize } from '../datasource/sequelize';

class StatsRepository {
  async getTop3MostSelledFromProductType(productId: number) {
    const product = await ProductModel.findOne({ where: { ProId: productId }, attributes: ['product_type_id'] });
    const result = await ProductModel.findAll({
      where: { ProTypId: product.ProTypId },
      attributes: {
        include: [
          [
            sequelize.literal(
              `(select count(*) as quantity from orderProducts op where op.productId = Product.id order by quantity desc )`
            ),
            'quantity',
          ],
        ],
      },
    });

    const res = result
      .sort((a, b) => {
        if (Object.assign(a).dataValues.dataValues.quantity < Object.assign(b).dataValues.quantity) {
          return 1;
        }
        if (Object.assign(a).dataValues.quantity > Object.assign(b).dataValues.quantity) {
          return -1;
        }
        return 0;
      })
      .filter((p: any, index: number) => {
        if (index < 3) {
          return p;
        }
      })
      .filter((p: any) => {
        if (p.dataValues.id == productId) {
          return p;
        }
      });

    return res;
  }
}

export const statsRepository = new StatsRepository();
