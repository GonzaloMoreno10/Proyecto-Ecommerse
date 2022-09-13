export interface IProductPresentationProperty {
  PreId: number;
  PreProId: number;
  PreValId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface IProductPresentationPropertyFilter {
  PreProId: number;
  PreValId: number;
  enabled: boolean;
}

export interface INewProductPresentationProperty {
  PreId?: number;
  PreProId: number;
  PreValId: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}
