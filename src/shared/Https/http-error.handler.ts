import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const message = `[HttpErrorHandler] ${request.method} ${request.url}`;
    Logger.error(message);
    response.status(404).json({
      success: false,
      statusCode: exception.getStatus(),
      path: request.url,
      method: request.method,
      message: 'Invalid url.',
    });
  }
}
