import { inspect } from 'util';
import {
  Catch,
  ExecutionContext,
  HttpException,
  HttpServer,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AnyExceptionFilter extends BaseExceptionFilter {
  constructor(
    private logger: LoggerService,
    applicationRef?: HttpServer,
  ) {
    super(applicationRef);
  }

  // eslint-disable-next-line complexity
  catch(error, context: ExecutionContext) {
    const applicationRef =
      this.applicationRef || this?.httpAdapterHost?.httpAdapter;

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!statusCode || statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error('Internal server error', {
        url: request.url,
        body: request.body ? JSON.stringify(request.body) : request.body,
        error: inspect(error, false, null),
      });

      return super.handleUnknownError(error, context, applicationRef);
    }

    response.status(statusCode).json({
      statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
      errCode: error.response.errCode,
      property: error.response?.property,
      validationErrors: error.response.validationErrors,
    });
  }
}
