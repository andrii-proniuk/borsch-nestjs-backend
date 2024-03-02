import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isString, length } from 'class-validator';
import { EmailVerificationCodeRepositoryService } from '../../repositories/email-verification-code/email-verification-code-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { AUTH_ERRORS, VERIFICATION_CODE_LENGTH } from '../auth.constants';
import { NotFoundException } from '../../common/exceptions/http.exception';

@Injectable()
export class EmailVerificationCodeValidGuard implements CanActivate {
  constructor(
    private emailVerificationCodeRepositoryService: EmailVerificationCodeRepositoryService,
  ) {}

  private validate(value: any): value is string {
    return (
      isString(value) &&
      length(value, VERIFICATION_CODE_LENGTH, VERIFICATION_CODE_LENGTH)
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();
    const { code } = req.params;

    if (!this.validate(code)) {
      return true;
    }

    const emailVerificationCode =
      await this.emailVerificationCodeRepositoryService.getByCode(code);

    if (!emailVerificationCode) {
      throw new NotFoundException(AUTH_ERRORS.VERIFICATION_CODE_NOT_FOUND);
    }

    return true;
  }
}
