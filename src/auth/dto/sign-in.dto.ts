import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class SignInDto extends PickType(SignUpDto, [
  'email',
  'password',
] as const) {}
