import { Exclude, Expose } from 'class-transformer';

@Exclude()
class ProfileResponseDto {
  @Expose()
  nickname: string;
}

@Exclude()
export class SignInResponseDto {
  @Expose()
  profile: ProfileResponseDto;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
