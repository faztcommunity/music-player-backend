import { Response } from 'express';
import httpCodes from 'http-status-codes';

class JsonResponse {
  private statusCode: number;

  constructor(private res: Response) {
    this.statusCode = 0;
  }

  public ok(message: string, data: object, extra?: object): void {
    this.statusCode = httpCodes.OK;
    this.execute({ message, data, extra });
  }

  public notFound(): void {
    this.statusCode = httpCodes.NOT_FOUND;
    // TODO:
  }

  public error(): void {
    this.statusCode = httpCodes.BAD_REQUEST;
    // TODO:
  }

  private execute({ message, data, extra }: any): void {
    this.res.status(this.statusCode);
    this.res.json({
      response: httpCodes.getStatusText(this.statusCode),
      message: message,
      data,
      ...extra
    });
  }
}

export default JsonResponse;
