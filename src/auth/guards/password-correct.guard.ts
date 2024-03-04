import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isEmpty, isString, maxLength, minLength } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import {
  AUTH_ERRORS,
  AUTH_VALIDATION_ERRORS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../auth.constants';
import { BadRequestException } from '../../common/exceptions/http.exception';

@Injectable()
export class PasswordCorrectGuard implements CanActivate {
  private validate(value: any): void {
    if (isEmpty(value)) {
      throw new BadRequestException(AUTH_VALIDATION_ERRORS.PASSWORD_EMPTY);
    }

    if (!isString(value)) {
      throw new BadRequestException(AUTH_VALIDATION_ERRORS.PASSWORD_INVALID);
    }

    if (!minLength(value, PASSWORD_MIN_LENGTH)) {
      throw new BadRequestException(
        AUTH_VALIDATION_ERRORS.PASSWORD_MIN_LENGTH_INVALID,
      );
    }

    if (!maxLength(value, PASSWORD_MAX_LENGTH)) {
      throw new BadRequestException(
        AUTH_VALIDATION_ERRORS.PASSWORD_MAX_LENGTH_INVALID,
      );
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();
    const { password } = req.body;

    this.validate(password);

    const { user } = req.locals;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(AUTH_ERRORS.INVALID_EMAIL_OR_PASSWORD);
    }

    return true;
  }
}
