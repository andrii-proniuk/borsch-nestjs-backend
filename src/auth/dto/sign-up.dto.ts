import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  AUTH_VALIDATION_ERRORS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../auth.constants';

export class SignUpDto {
  @IsString({ message: AUTH_VALIDATION_ERRORS.NICKNAME_INVALID })
  @IsNotEmpty({ message: AUTH_VALIDATION_ERRORS.NICKNAME_EMPTY })
  nickname: string;

  @IsEmail(undefined, { message: AUTH_VALIDATION_ERRORS.EMAIL_INVALID })
  @IsNotEmpty({ message: AUTH_VALIDATION_ERRORS.EMAIL_EMPTY })
  email: string;

  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: AUTH_VALIDATION_ERRORS.PASSWORD_MAX_LENGTH_INVALID,
  })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: AUTH_VALIDATION_ERRORS.PASSWORD_MIN_LENGTH_INVALID,
  })
  @IsString({ message: AUTH_VALIDATION_ERRORS.PASSWORD_INVALID })
  @IsNotEmpty({ message: AUTH_VALIDATION_ERRORS.PASSWORD_EMPTY })
  password: string;
}
