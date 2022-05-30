import { NextFunction, Request, Response } from 'express';
import { type } from 'os';
import { idText } from 'typescript';
import { INewProduct, IProductFilters } from '../interface';
import { brandModelLineRepository } from '../repositories/brandModelLine.repository';
import { categoryRepository } from '../repositories/category.repository';
import { productTypeRepository } from '../repositories/productType.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';

export const productValidator = async (req: Request, res: Response, next: NextFunction) => {
  const product: INewProduct = req.body;
  const errors = [];
  const obligatorios = ['ProName', 'ProPrice', 'ProStock', 'ProTypId', 'ProCatId', 'ProBmlId'];
  const missing = validateBindings(obligatorios, product);
  if (missing.length > 0) {
    errors.push(534);
  }
  if (product.ProTypId) {
    const res = await productTypeRepository.getById(product.ProTypId);
    if (!res) {
      errors.push(507);
    }
  }
  if (product.ProCatId) {
    const cat = await categoryRepository.getById(product.ProCatId);
    if (!cat) {
      errors.push(524);
    }
  }
  if (product.ProBmlId) {
    const bml = await brandModelLineRepository.getById(product.ProBmlId);
    if (!bml) {
      errors.push(544);
    }
  }
  if (errors.length > 0) {
    return constructResponse(errors, res, undefined, undefined, validateBindings(obligatorios, product));
  }

  const prod: INewProduct = {
    ProBmlId: product.ProBmlId,
    ProCatId: product.ProCatId,
    ProCod: product.ProCod,
    ProDesc: product.ProDesc,
    ProDiscount: product.ProDiscount,
    ProImgs: product.ProImgs,
    ProIsOffer: product.ProIsOffer,
    ProName: product.ProName,
    ProPrice: product.ProPrice,
    ProStock: product.ProStock,
    ProTypId: product.ProTypId,
    ProUsrId: res.locals.userData.userId,
    createdAt: new Date(),
    createdUser: res.locals.userData.userId,
  };
  res.locals.newProduct = prod;
  return next();
};

export const filterValidator = (req: Request, res: Response, next: NextFunction) => {
  const filters = Object.entries(req.query);
  let hasError = false;
  const invalidFilters = [];
  const avaibleFilters = [
    'ProName',
    'MaxPrice',
    'MinPrice',
    'MaxStock',
    'MinStock',
    'ProCod',
    'ProCatId',
    'ProTypId',
    'ProIsOffer',
    'MinDiscount',
    'MaxDiscount',
    'ProUsrId',
    'pageSize',
    'sort',
    'page',
    'enabled',
    'fields',
  ];
  const object: any = {};

  for (const i in filters) {
    if (avaibleFilters.filter(x => x === filters[i][0]).length > 0) {
      if (!object[filters[i][0]]) {
        object[filters[i][0]] = filters[i][1];
      }
    } else {
      invalidFilters.push(filters[i][0]);
    }
  }

  if (invalidFilters.length > 0) {
    return constructResponse(614, res, undefined, undefined, invalidFilters);
  }
  let toReturn: Partial<IProductFilters> = {};

  if (object.MaxPrice) {
    if (!isNaN(object.MaxPrice)) {
      toReturn.MaxPrice = Number(object.MaxPrice);
    } else {
      hasError = true;
    }
  }
  if (object.sort) {
    if (isNaN(object.sort)) {
      toReturn.sort = object.sort;
    }
  }
  if (object.MinPrice) {
    if (!isNaN(object.MinPrice)) {
      toReturn.MinPrice = Number(object.MinPrice);
    } else {
      hasError = true;
    }
  }
  if (object.MaxStock) {
    if (!isNaN(object.MaxStock)) {
      toReturn.MaxStock = Number(object.MaxStock);
    } else {
      hasError = true;
    }
  }
  if (object.MinStock) {
    if (!isNaN(object.MinStock)) {
      toReturn.MinStock = Number(object.MinStock);
    } else {
      hasError = true;
    }
  }
  if (object.MaxDiscount) {
    if (!isNaN(object.MaxDiscount)) {
      toReturn.MaxDiscount = Number(object.MaxDiscount);
    } else {
      hasError = true;
    }
  }
  if (object.MinDiscount) {
    if (!isNaN(object.MinDiscount)) {
      toReturn.MinDiscount = Number(object.MinDiscount);
    } else {
      hasError = true;
    }
  }
  if (object.ProCod) {
    if (object.ProCod && !isNaN(object.ProCod)) {
      toReturn.ProCod = Number(object.ProCod);
    } else {
      hasError = true;
    }
  }
  if (object.ProCatId) {
    if (object.ProCatId && !isNaN(object.ProCatId)) {
      toReturn.ProCatId = Number(object.ProCatId);
    } else {
      hasError = true;
    }
  }
  if (object.ProTypId) {
    if (object.ProTypId && !isNaN(object.ProTypId)) {
      toReturn.ProTypId = Number(object.ProTypId);
    } else {
      hasError = true;
    }
  }
  if (object.ProUsrId) {
    if (object.ProUsrId && !isNaN(object.ProUsrId)) {
      toReturn.ProUsrId = Number(object.ProUsrId);
    } else {
      hasError = true;
    }
  }
  if (object.ProTypId) {
    if (object.ProTypId && !isNaN(object.ProTypId)) {
      toReturn.ProTypId = Number(object.ProTypId);
    } else {
      hasError = true;
    }
  }
  if (object.enabled) {
    if (object.enabled === 'true' || object.enabled === '1') {
      toReturn.enabled = true;
    } else {
      if (object.enabled === 'false' || object.enabled === '0') {
        toReturn.enabled = false;
      } else {
        hasError = true;
      }
    }
  }
  if (object.ProIsOffer) {
    if (object.ProIsOffer === 'false' || object.ProIsOffer === '0') {
      toReturn.ProIsOffer = false;
    } else {
      if (object.ProIsOffer === 'true' || object.ProIsOffer === '1') {
        toReturn.ProIsOffer = false;
      } else {
        hasError = true;
      }
    }
  }
  if (object.ProName) {
    if (isNaN(object.ProName)) {
      toReturn.ProName = object.ProName;
    } else {
      hasError = true;
    }
  }
  if (hasError) {
    return constructResponse(604, res);
  }
  res.locals.productFilter = toReturn;
  return next();
};

export const fieldValidator = (req: Request, res: Response, next: NextFunction) => {
  const { fields } = req.query;
  const avaibleFields = ['PRBML', 'PRCAT', 'PRTYP', 'PRPRO'];
  const invalidFields = [];
  const errors = [];
  if (!fields) {
    return next();
  }

  const arrayFields = String(fields).split(',');
  arrayFields.map(field => {
    if (!avaibleFields.includes(field)) {
      invalidFields.push(field);
    }
  });

  if (invalidFields.length > 0) {
    return constructResponse(634, res, undefined, undefined, invalidFields);
  }

  console.log(arrayFields);
  res.locals.productFields = arrayFields;
  return next();
};
