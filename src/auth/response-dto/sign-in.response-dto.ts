import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class ProfileResponseDto {
  @Expose()
  nickname: string;

  @Expose()
  fullname: string;
}

@Exclude()
export class SignInResponseDto {
  @Expose()
  @Type(() => ProfileResponseDto)
  profile: ProfileResponseDto;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
