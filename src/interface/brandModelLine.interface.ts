export interface IBrandModelLine {
  BmlId: number;
  BmlBraId: string;
  BmlModId: number;
  BmlLinId: string;
  enabled: string;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
}

export interface INewBrandModelLine {
  BmlId?: number;
  BmlBraId: string;
  BmlModId: number;
  BmlLinId: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
}
