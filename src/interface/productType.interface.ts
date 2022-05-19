export interface IProductType {
  TypId: number;
  TypName: string;
  TypCatId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
}

export interface INewProductType {
  TypId?: number;
  TypName: string;
  TypCatId: number;
  createdAt: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled: boolean;
}
