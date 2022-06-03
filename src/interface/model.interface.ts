export interface IModel {
  ModId: number;
  ModName: string;
  ModBraId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface IModelFilter {
  ModName: string;
  ModBraId: number;
  createdUser: number;
  enabled: true;
}

export interface INewModel {
  ModId?: number;
  ModName: string;
  ModBraId: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}
