import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isEmail, isEmpty } from 'class-validator';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { BadRequestException } from '../../common/exceptions/http.exception';
import { AUTH_ERRORS, AUTH_VALIDATION_ERRORS } from '../auth.constants';

@Injectable()
export class UserExistsByEmailGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  private validate(value: any): void {
    if (isEmpty(value)) {
      throw new BadRequestException({
        code: AUTH_VALIDATION_ERRORS.EMAIL_EMPTY,
        property: 'email',
      });
    }

    if (!isEmail(value)) {
      throw new BadRequestException({
        code: AUTH_VALIDATION_ERRORS.EMAIL_INVALID,
        property: 'email',
      });
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { email } = req.body;

    this.validate(email);

    const user = await this.usersRepositoryService.getByEmail(email, true);

    if (!user) {
      throw new BadRequestException({
        code: AUTH_ERRORS.INVALID_EMAIL_OR_PASSWORD,
      });
    }

    req.locals = { user };

    return true;
  }
}
