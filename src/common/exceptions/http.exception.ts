import { HttpException, HttpStatus } from '@nestjs/common';

// 400
export class BadRequestException extends HttpException {
  constructor(code?: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        errCode: code ?? '',
        // message: data?.message ?? '',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

// 401
export class UnauthorizedException extends HttpException {
  constructor(data: { message?: string; code?: string }) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        errCode: data?.code ?? '',
        message: data?.message ?? '',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

// 403
export class ForbiddenException extends HttpException {
  constructor(data: { message?: string; code?: string }) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        errCode: data?.code ?? '',
        message: data?.message ?? '',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

// 404
export class NotFoundException extends HttpException {
  constructor(code?: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        errCode: code ?? '',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
