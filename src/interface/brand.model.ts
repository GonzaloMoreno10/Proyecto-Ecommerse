export interface IBrand {
  BraId: number;
  BraName: string;
  BraTypId: number;
  BraImg?: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  deletedAt: Date;
  deletedUser: number;
}

export interface INewBrand {
  BraId?: number;
  BraName: string;
  BraTypId: number;
  BraImg?: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  deletedAt?: Date;
  deletedUser?: number;
}

export interface IBrand2 {
  id?: number;
  name: string;
  productTypeId: number;
  image: string;
  enabled: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser: number;
}
export interface INewBrand2 {
  id?: number;
  name: string;
  productTypeId: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
}
