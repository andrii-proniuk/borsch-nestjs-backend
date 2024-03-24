import { IsNotEmpty, IsString, Length } from 'class-validator';
import { TAGS_NAME_MAX_LENGTH, TAGS_NAME_MIN_LENGTH } from '../tags.constants';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @Length(TAGS_NAME_MIN_LENGTH, TAGS_NAME_MAX_LENGTH)
  name: string;
}
