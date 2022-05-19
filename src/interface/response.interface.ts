export interface IResponse {
  code: number;
  data?: Object[] | Object;
  message?: string;
  errors?: IError[];
}

export interface IError {
  code: number;
  message: string;
}
