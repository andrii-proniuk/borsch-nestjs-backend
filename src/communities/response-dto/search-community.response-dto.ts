import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SearchCommunitiesResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  followersCount: number;
}
