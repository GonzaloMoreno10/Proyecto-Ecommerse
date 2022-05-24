export interface IUser {
  UsrId: number;
  UsrEmail: string;
  UsrPass: string;
  UsrName: string;
  UsrAddress: string;
  UsrBirthDate: Date;
  UsrPhone: string;
  UsrAvatar: string;
  UsrRolId: number;
  UsrDoc: number;
  UsrDocType: number;
  UsrVerfied: boolean;
  UsrValidCod: string;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
  deletedAt: Date;
  deletedUser: number;
}

export interface INewUser {
  UsrId?: number;
  UsrEmail: string;
  UsrPass: string;
  UsrName: string;
  UsrAddress: string;
  UsrBirthDate: Date;
  UsrPhone: string;
  UsrAvatar: string;
  UsrRolId: number;
  UsrDoc: number;
  UsrDocType: number;
  UsrVerfied: boolean;
  UsrValidCod: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
  deletedAt?: Date;
  deletedUser?: number;
}
