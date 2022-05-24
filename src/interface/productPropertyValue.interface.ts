export interface IProductPropertyValue {
  ValId: number;
  ValName: string;
  ValDesc: string;
  ValSuiId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface INewProductPropertyValue {
  ValId?: number;
  ValName: string;
  ValDesc: string;
  ValSuiId: number;
  createdAt: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}
