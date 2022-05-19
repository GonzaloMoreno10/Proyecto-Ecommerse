import { OrderModel, OrderProductsModel, ProductModel, sequelize } from '../datasource/sequelize';

import { IOrderProduct } from '../interface/orderProduct.interface';
import { mysqlDataSource } from '../services/mysql.service';

class OrderRepository {
  private connection = mysqlDataSource.connection();

  async getOrders(): Promise<any[]> {
    const query = `select o.id,u.id as userId,o.createdAt,o.estado, op.id as opId, op.estado as opEstado, op.quantity , p.id as productId,p.nombre,p.precio,p.stock,p.codigo,p.foto,p.categoria,p.marca_id,p.descripcion ,p.product_type_id from orders o
    join orderProducts op on op.orderId = o.id
    join products p on p.id = op.productId
    join users u on u.id = o.userId`;
    const result = await this.connection.query(query);
    return <any[]>result[0];
  }

  async getOrdersByUser(userId: number, id?: number) {
    const whereClause: any = { userId: userId };
    if (id) {
      whereClause.id = id;
    }
    const res = await OrderModel.findAll({
      where: whereClause,
      attributes: {
        include: [
          [sequelize.literal(`(select sum(price) from orderProducts op where op.orderId = Order.id )`), 'price'],
        ],
      },
      include: [
        {
          model: OrderProductsModel,
          required: true,
          include: [
            {
              model: ProductModel,
              attributes: {
                include: [
                  [
                    sequelize.literal(
                      `(select price from orderProducts op where op.orderId = Order.id and op.productId = ${'`'}OrderProducts->Product${'`'}.id )`
                    ),
                    'price',
                  ],
                ],
              },
              required: true,
            },
          ],
        },
      ],
    });
    return res;
  }
  async getOrderById(id: number) {
    const query = `select o.id,u.id as userId,o.createdAt,o.estado,op.price, op.id as opId, op.estado as opEstado, op.quantity , p.id as productId,p.nombre,p.precio,p.stock,p.codigo,p.foto,p.categoria,p.marca_id,p.descripcion ,p.product_type_id from orders o
      join orderProducts op on op.orderId = o.id
      join products p on p.id = op.productId
      join users u on u.id = o.userId
      where o.id = ${id}`;
    const result = await this.connection.query(query);
    return <any[]>result[0];
  }

  async createOrder(userId: number) {
    const query = `insert into orders (estado,userId) values(1,${userId})`;
    const result = await this.connection.query(query);
    return <any[]>result[0];
  }

  async createOrderProducts(orderId: number, products: IOrderProduct[]) {
    try {
      let query = 'insert into orderProducts (orderId,productId,quantity,price) values';
      for (let i in products) {
        query += `(${orderId},${products[i].OrpProId},${products[i].OrpQuantity},${products[i].OrpPrice})`;
        if (parseInt(i) < products.length - 1) {
          query += ',';
        } else {
          query += ';';
        }
      }
      const res = await this.connection.query(query);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

export const mysqlOrderRepository = new OrderRepository();
