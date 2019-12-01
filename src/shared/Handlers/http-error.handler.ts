import { get } from 'lodash';
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
    // create message for logging in console
    const message = `[HttpErrorHandler] ${request.method} ${request.url}`;
    Logger.error(message);
    response.status(404).json({
      success: false,
      path: request.url,
      message: get(exception, 'message.message', 'Invalid url.'),
      data: {},
    });
  }
}
