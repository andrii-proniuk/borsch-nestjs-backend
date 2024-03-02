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
  @IsNotEmpty({ message: AUTH_VALIDATION_ERRORS.NICKNAME_EMPTY })
  @IsString({ message: AUTH_VALIDATION_ERRORS.NICKNAME_INVALID })
  nickname: string;

  @IsNotEmpty({ message: AUTH_VALIDATION_ERRORS.EMAIL_EMPTY })
  @IsEmail(undefined, { message: AUTH_VALIDATION_ERRORS.EMAIL_INVALID })
  email: string;

  @IsNotEmpty({ message: AUTH_VALIDATION_ERRORS.PASSWORD_EMPTY })
  @IsString({ message: AUTH_VALIDATION_ERRORS.PASSWORD_INVALID })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: AUTH_VALIDATION_ERRORS.PASSWORD_MIN_LENGTH_INVALID,
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: AUTH_VALIDATION_ERRORS.PASSWORD_MAX_LENGTH_INVALID,
  })
  password: string;
}
