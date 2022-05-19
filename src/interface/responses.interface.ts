export interface IResponses {
  resId: number;
  resDesc: string;
  resIsError: boolean;
  resCod: number;
}

export interface INewResponse {
  resId?: number;
  resDesc: string;
  resIsError: boolean;
  resCod: number;
}
