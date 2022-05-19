export type IOrder = {
  OrdId: number;
  OrdState: number;
  OrdUsrId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
};

export type INewOrder = {
  OrdId?: number;
  OrdState: number;
  OrdUsrId: number;
  createdAt: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled: boolean;
};
