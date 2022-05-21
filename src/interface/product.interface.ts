import { IBrandModelLine, IBrandModelLineRelations } from './brandModelLine.interface';
import { IProductType, IProductTypeRelations } from './productType.interface';

export interface IProduct {
  ProId: number;
  ProName: string;
  ProPrice: string;
  ProStock: number;
  ProCod: number;
  ProDesc: string;
  ProCatId: number;
  ProTypId: number;
  ProIsOffer: number;
  ProDiscount: number;
  ProImgs: string[];
  ProBmlId: number;
  ProUsrId: number;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
  enabled: boolean;
}

export interface INewProduct {
  ProId?: number;
  ProName: string;
  ProPrice: string;
  ProStock: number;
  ProCod: number;
  ProDesc: string;
  ProCatId: number;
  ProTypId: number;
  ProIsOffer: number;
  ProDiscount: number;
  ProImgs: string[];
  ProBmlId: number;
  ProUsrId: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
  enabled?: boolean;
}

export interface IProductRelations extends IProduct {
  PRBML: IBrandModelLineRelations;
  PRTYP: IProductTypeRelations;
}
