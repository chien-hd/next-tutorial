export interface IGenericResponse<T = any> {
  map(arg0: (item: any) => string): unknown;
  status: number;
  is_flag: boolean;
  msg: string;
  data: T;
}

export type ApiResponse<T = any> = {
  status: number;
  payload: T;
};
