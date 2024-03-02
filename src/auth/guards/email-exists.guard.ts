import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { BadRequestException } from '../../common/exceptions/http.exception';
import { AUTH_ERRORS } from '../auth.constants';

@Injectable()
export class EmailExistsGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  private validate(value: any): value is string {
    return isEmail(value);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { email } = req.body;

    if (!this.validate(email)) {
      return true;
    }

    const user = await this.usersRepositoryService.getByEmail(email);

    if (!user) {
      throw new BadRequestException(AUTH_ERRORS.INVALID_EMAIL_OR_PASSWORD);
    }

    req.locals = { user };

    return true;
  }
}
