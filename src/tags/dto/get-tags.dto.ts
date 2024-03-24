import { IsNotEmpty, IsString } from 'class-validator';

export class SearchTagsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
