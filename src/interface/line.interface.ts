export interface ILine {
  LinId: number;
  LinName: string;
  LinModId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface ILineFilter {
  LinName: object;
  LinModId: number;
  enabled: boolean;
}

export interface INewLine {
  LinId?: number;
  LinName: string;
  LinModId: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}
