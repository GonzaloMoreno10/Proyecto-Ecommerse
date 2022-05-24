export interface ICategory {
  CatId: number;
  CatName: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface INewCategory {
  CatId?: number;
  CatName: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}
