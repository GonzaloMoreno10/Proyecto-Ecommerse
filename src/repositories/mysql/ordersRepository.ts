import { IProduct } from '../../interface';
import { IOrder, IOrderProducts } from '../../interface/orden.interface';
import { mysqlDataSource } from '../../services/mysql';

class OrderRepository {
  private connection = mysqlDataSource.connection();

  async getOrders(): Promise<any[]> {
    const query = `select o.id,u.id as userId,o.created_at,o.estado, op.id as opId, op.estado as opEstado, op.quantity , p.id as productId,p.nombre,p.precio,p.stock,p.codigo,p.foto,p.categoria,p.marca_id,p.descripcion ,p.product_type_id from orders o
    join orderProducts op on op.orderId = o.id
    join products p on p.id = op.productId
    join users u on u.id = o.userId`;
    const result = await this.connection.query(query);
    return <any[]>result[0];
  }

  async getOrdersByUser(userId: number): Promise<IOrder[]> {
    const query = `select o.id,u.id as userId,o.created_at,o.estado,op.price, op.id as opId, op.estado as opEstado, op.quantity , p.id as productId,p.nombre,p.precio,p.stock,p.codigo,p.foto,p.categoria,p.marca_id,p.descripcion ,p.product_type_id from orders o
    join orderProducts op on op.orderId = o.id
    join products p on p.id = op.productId
    join users u on u.id = o.userId
    where o.userId = ${userId}
    order by o.id desc`;
    const result = await this.connection.query(query);
    return <IOrder[]>result[0];
  }

  async getOrderById(id: number) {
    const query = `select o.id,u.id as userId,o.created_at,o.estado,op.price, op.id as opId, op.estado as opEstado, op.quantity , p.id as productId,p.nombre,p.precio,p.stock,p.codigo,p.foto,p.categoria,p.marca_id,p.descripcion ,p.product_type_id from orders o
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

  async createOrderProducts(orderId: number, products: IOrderProducts[]) {
    try {
      let query = 'insert into orderProducts (orderId,productId,quantity,price) values';
      for (let i in products) {
        query += `(${orderId},${products[i].productId},${products[i].quantity},${products[i].price})`;
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
