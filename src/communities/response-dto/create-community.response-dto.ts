import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateCommunityResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
