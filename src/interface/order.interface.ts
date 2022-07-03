import { IOrderProduct, IOrderProductRelation } from './orderProduct.interface';

export interface IOrder {
  OrdId: number;
  OrdState: number;
  OrdUsrId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface IOrderFilter {
  OrdState: number;
  OrdUsrId: number;
  enabled: true;
  OrdId: number;
}

export interface INewOrder {
  OrdId?: number;
  OrdState: number;
  OrdUsrId: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser?: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}

export interface IOrderRelation extends IOrder {
  FAORP: IOrderProductRelation[];
}
