export interface IResponse<T> {
    results: T;
    info: IResponseInfo;
  }
  
  interface IResponseInfo {
    count: number;
    pages: number;
    next: string;
    prev: string;
  }