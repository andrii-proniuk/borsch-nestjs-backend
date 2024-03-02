import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isString, length } from 'class-validator';
import bcrypt from 'bcrypt';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import {
  AUTH_ERRORS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../auth.constants';
import { BadRequestException } from '../../common/exceptions/http.exception';

@Injectable()
export class PasswordCorrectGuard implements CanActivate {
  private validate(value: any): value is string {
    return (
      isString(value) && length(value, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();
    const { password } = req.body;

    if (!this.validate(password)) {
      return true;
    }

    const { user } = req.locals;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(AUTH_ERRORS.INVALID_EMAIL_OR_PASSWORD);
    }

    return true;
  }
}
