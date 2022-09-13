import { IOrderRelation } from './order.interface';
import { IProductRelations } from './product.interface';
import { IUser } from './user.interface';

export interface IOrderProduct {
  OrpId: number;
  OrpState: number;
  OrpOrdId: number;
  OrpProId: number;
  OrpQuantity: number;
  OrpPrice: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface IOrderProductFilter {
  OrpState: number;
  OrpOrdId: number;
  OrpProId: number;
  maxPrice: number;
  minPrice: number;
  minQuantity: number;
  maxQuantity: number;
}

export interface INewOrderProduct {
  OrpId?: number;
  OrpState: number;
  OrpOrdId: number;
  OrpProId: number;
  OrpQuantity: number;
  OrpPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}

export interface IPostOrderProduct extends INewOrderProduct {
  OrpOrdId: number;
  OrpProds: [{ OrpProId: number; OrpQuantity: number }];
}

export interface IOrderProductRelation extends IOrderProduct {
  PRPRO: IProductRelations;
  FAORD: IOrderRelation;
}
