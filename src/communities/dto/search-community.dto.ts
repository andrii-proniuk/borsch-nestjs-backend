import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import {
  COMMUNITY_NAME_MAX_LENGTH,
  COMMUNITY_NAME_MIN_LENGTH,
} from '../communities.constants';

export class SearchCommunitiesDto extends PaginationDto {
  @IsNotEmpty()
  @IsString()
  @Length(COMMUNITY_NAME_MIN_LENGTH, COMMUNITY_NAME_MAX_LENGTH)
  name: string;
}
