import { Orden } from '../../interface/orden.interface';
import ordenModel from '../../models/orders.model';

class OrderRepository {
  private ordenes: any;
  constructor() {
    this.ordenes = ordenModel;
  }

  async findOrdersById(id: string) {
    let orden = await this.ordenes.findById(id);
    return orden;
  }

  async findOrdersByUser(userId: string): Promise<Orden[]> {
    let orders = await this.ordenes.find({ userId: userId });
    return orders;
  }

  async findAll(): Promise<Orden[]> {
    let orders = await this.ordenes.find();
    return orders;
  }

  async createOrder(orden: Orden): Promise<Orden> {
    let newOrden = new this.ordenes(orden);
    let res = await newOrden.save();

    return res;
  }
}

export const orderRepository = new OrderRepository();
