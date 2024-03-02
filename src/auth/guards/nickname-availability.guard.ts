import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isString } from 'class-validator';
import { ProfilesRepositoryService } from '../../repositories/profiles/profiles-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { SignUpDto } from '../dto/sign-up.dto';
import { BadRequestException } from '../../common/exceptions/http.exception';
import { AUTH_ERRORS } from '../auth.constants';

@Injectable()
export class NicknameAvailabilityGuard implements CanActivate {
  constructor(private profilesRepositoryService: ProfilesRepositoryService) {}

  private validate(value: any): value is string {
    return isString(value);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();
    const { nickname } = req.body as SignUpDto;

    if (!this.validate(nickname)) {
      return true;
    }

    const isNicknameExists =
      await this.profilesRepositoryService.existsByNickname(nickname);

    if (isNicknameExists) {
      throw new BadRequestException(AUTH_ERRORS.NICKNAME_ALREADY_TAKEN);
    }

    return true;
  }
}
