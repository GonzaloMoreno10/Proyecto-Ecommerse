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
}

export interface INewOrderProduct {
  OrpId?: number;
  OrpState: number;
  OrpOrdId: number;
  OrpProId: number;
  OrpQuantity: number;
  OrpPrice: number;
  createdAt: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled: boolean;
}
