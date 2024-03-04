import { Exclude, Expose } from 'class-transformer';
import { AUTH_SUCCESS_MESSAGES } from '../auth.constants';

@Exclude()
export class SignUpResponseDto {
  @Expose()
  success = true;

  @Expose()
  message = AUTH_SUCCESS_MESSAGES.ACCOUNT_CREATED;
}
