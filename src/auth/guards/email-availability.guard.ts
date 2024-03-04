import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isEmail, isEmpty } from 'class-validator';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { BadRequestException } from '../../common/exceptions/http.exception';
import { AUTH_ERRORS, AUTH_VALIDATION_ERRORS } from '../auth.constants';

@Injectable()
export class EmailAvailabilityGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  private validate(value: any): void {
    if (isEmpty(value)) {
      throw new BadRequestException(AUTH_VALIDATION_ERRORS.EMAIL_EMPTY);
    }

    if (!isEmail(value)) {
      throw new BadRequestException(AUTH_VALIDATION_ERRORS.EMAIL_INVALID);
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();
    const { email } = req.body;

    this.validate(email);

    const isEmailAlreadyTaken =
      await this.usersRepositoryService.existsByEmail(email);

    if (isEmailAlreadyTaken) {
      throw new BadRequestException(AUTH_ERRORS.EMAIL_ALREADY_TAKEN);
    }

    return true;
  }
}
