import { IError, IResponse } from '../interface/response.interface';
import { Response } from 'express';
import { responseRepository } from '../repositories/response.repository';
import { IResponses } from '../interface/responses.interface';
export const constructResponse = async (
  resId: number | number[],
  res: Response,
  data?: Object | Object[],
  message?: string,
  fieldName?: string[] | string
) => {
  const response: IResponses[] = await responseRepository.getByResIds(resId);
  response.map(res => {
    if (res.resId == 534) {
      res.resDesc = res.resDesc + ': [' + fieldName + ']';
    }
  });
  let toReturn: IResponse;
  if (response.some(x => x.resCod >= 400)) {
    const errors = response.map(res => {
      const error: IError = {
        code: res.resId,
        message: message ?? res.resDesc,
      };
      return error;
    });

    toReturn = {
      code: response.length > 1 ? 400 : response[0].resCod,
      errors: errors,
    };
  } else {
    toReturn = {
      code: response[0].resCod,
      message: response[0].resDesc,
      data: data ? (Object.assign(data).token ? data : Array.isArray(data) ? data : [data]) : [],
    };
  }
  res.status(toReturn.code).json(toReturn);
};
