import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isEmail, isString } from 'class-validator';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { BadRequestException } from '../../common/exceptions/http.exception';
import { AUTH_ERRORS } from '../auth.constants';

@Injectable()
export class EmailAvailabilityGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  private validate(value: any): value is string {
    return isString(value) && isEmail(value);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();
    const { email } = req.body;

    if (!this.validate(email)) {
      return true; // error will be thrown from dto validation
    }

    const isEmailAlreadyTaken =
      await this.usersRepositoryService.existsByEmail(email);

    if (isEmailAlreadyTaken) {
      throw new BadRequestException(AUTH_ERRORS.EMAIL_ALREADY_TAKEN);
    }

    return true;
  }
}
