import { ProductModel, sequelize } from '../datasource/sequelize';

class StatsRepository {
  async getTop3MostSelledFromProductType(productId: number) {
    const product = await ProductModel.findOne({ where: { ProId: productId }, attributes: ['ProTypId'] });
    const result = await ProductModel.findAll({
      where: { ProTypId: product.ProTypId },
      attributes: {
        include: [
          [
            sequelize.literal(
              `(select count(*) as quantity from faorp orp where orp.OrpProId = PRPRO.ProId order by OrpQuantity desc )`
            ),
            'quantity',
          ],
        ],
      },
      order: [sequelize.literal('quantity DESC')],
      limit: 3,
    });
    const res = result
      .sort((a, b) => {
        if (Object.assign(a).quantity < Object.assign(b).quantity) {
          return 1;
        }
        if (Object.assign(a).quantity > Object.assign(b).quantity) {
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
        console.log(p.ProId);
        console.log(productId);
        if (p.ProId === productId) {
          return p;
        }
      });

    return res;
  }
}

export const statsRepository = new StatsRepository();
