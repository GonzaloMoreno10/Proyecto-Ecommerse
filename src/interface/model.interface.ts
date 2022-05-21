export interface IModel {
  ModId: number;
  ModName: string;
  ModBraId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
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
}
