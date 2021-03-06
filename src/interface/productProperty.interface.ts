export interface IProductProperty {
  ProId: number;
  ProTypId: number;
  ProCatId: number;
  ProName: string;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface INewProductProperty {
  ProId?: number;
  ProTypId: number;
  ProCatId: number;
  ProName: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}
