import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isEmpty, isString, maxLength, minLength } from 'class-validator';
import { ProfilesRepositoryService } from '../../repositories/profiles/profiles-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { SignUpDto } from '../dto/sign-up.dto';
import { BadRequestException } from '../../common/exceptions/http.exception';
import {
  AUTH_ERRORS,
  AUTH_VALIDATION_ERRORS,
  NICKNAME_MAX_LENGTH,
  NICKNAME_MIN_LENGTH,
} from '../auth.constants';

@Injectable()
export class NicknameAvailabilityGuard implements CanActivate {
  constructor(private profilesRepositoryService: ProfilesRepositoryService) {}

  private validate(value: any): void {
    if (isEmpty(value)) {
      throw new BadRequestException({
        code: AUTH_VALIDATION_ERRORS.NICKNAME_EMPTY,
        property: 'nickname',
      });
    }

    if (!isString(value)) {
      throw new BadRequestException({
        code: AUTH_VALIDATION_ERRORS.NICKNAME_INVALID,
        property: 'nickname',
      });
    }

    if (!minLength(value, NICKNAME_MIN_LENGTH)) {
      throw new BadRequestException({
        code: AUTH_VALIDATION_ERRORS.NICKNAME_MIN_LENGTH_INVALID,
        property: 'nickname',
      });
    }

    if (!maxLength(value, NICKNAME_MAX_LENGTH)) {
      throw new BadRequestException({
        code: AUTH_VALIDATION_ERRORS.NICKNAME_MAX_LENGTH_INVALID,
        property: 'nickname',
      });
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();
    const { nickname } = req.body as SignUpDto;

    this.validate(nickname);

    const isNicknameExists =
      await this.profilesRepositoryService.existsByNickname(nickname);

    if (isNicknameExists) {
      throw new BadRequestException({
        code: AUTH_ERRORS.NICKNAME_ALREADY_TAKEN,
        property: 'nickname',
      });
    }

    return true;
  }
}
