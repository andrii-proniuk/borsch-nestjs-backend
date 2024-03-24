import { Exclude } from 'class-transformer';
import { SignInResponseDto } from './sign-in.response-dto';

@Exclude()
export class SignUpResponseDto extends SignInResponseDto {}
