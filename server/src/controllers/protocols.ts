export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  body?: B;
  headers?: any;
  params?: any;
}

export interface Controller {
  handle: (
    httpResponse: HttpResponse<unknown>,
  ) => Promise<HttpResponse<unknown>>;
}
