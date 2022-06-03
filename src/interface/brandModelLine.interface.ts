import { IBrand } from './brand.model';
import { ILine } from './line.interface';
import { IModel } from './model.interface';

export interface IBrandModelLine {
  BmlId: number;
  BmlBraId: number;
  BmlModId: number;
  BmlLinId: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  deletedAt: Date;
  deletedUser: number;
}

export interface IBrandModelLineFilter {
  BmlBraId: number;
  BmlModId: number;
  BmlLinId: number;
  enabled: boolean;
}

export interface INewBrandModelLine {
  BmlId?: number;
  BmlBraId: number;
  BmlModId: number;
  BmlLinId: number;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  deletedAt?: Date;
  deletedUser?: number;
}

export interface IBrandModelLineRelations extends IBrandModelLine {
  PRBRA: IBrand;
  PRMOD: IModel;
  PRLIN: ILine;
}
