import { IError, IResponse } from '../interface/response.interface';
import { Response } from 'express';
import { responseRepository } from '../repositories/response.repository';
import { IResponses } from '../interface/responses.interface';
export const constructResponse = async (resId: number | number[], res: Response, data?: Object | Object[]) => {
  const response: IResponses[] = await responseRepository.getResponseByResIds(resId);
  let toReturn: IResponse;
  if (response.some(x => x.resCod >= 400)) {
    const errors = response.map(res => {
      const error: IError = {
        code: res.resId,
        message: res.resDesc,
      };
      return error;
    });

    toReturn = {
      code: 400,
      errors: errors,
    };
  } else {
    toReturn = {
      code: response[0].resCod,
      message: response[0].resDesc,
      data: data ?? [],
    };
  }
  res.status(toReturn.code).json(toReturn);
};
