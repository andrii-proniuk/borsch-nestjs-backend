import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SearchTagsResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
