export interface IProductPropertySubItem {
  SuiId: number;
  SuiProId: number;
  SuiName: string;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface INewProductPropertySubItem {
  SuiId?: number;
  SuiProId: number;
  SuiName: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}
