import { Response } from 'express';
import httpCodes from 'http-status-codes';

const PROTECTED_ATTRIBUTES: string[] = ['password', 'token'];

class JsonResponse {
  private statusCode: number;

  constructor(private res: Response, private protect: boolean = false) {
    this.statusCode = 0;
  }

  public ok(message: string, data: object = {}, extra?: object): void {
    this.statusCode = httpCodes.OK;

    // TODO: conseguir la manera de proteger la data siempre por el modelo de sequelize
    if (this.protect)
      PROTECTED_ATTRIBUTES.forEach((attr: string) => delete (data as any)[attr]);

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
    // TODO: agregar codigo interno para errores y mensajes
    this.res.status(this.statusCode);
    this.res.json({
      response: httpCodes.getStatusText(this.statusCode),
      message: message,
      data,
      ...extra
    });

    global.database.close();
  }
}

export default JsonResponse;
