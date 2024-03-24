import { Exclude, Expose } from 'class-transformer';
import { DefaultSuccessResponseDto } from '../../common/response-dto/default-success.response-dto';

@Exclude()
export class CreateRecipeResponseDto extends DefaultSuccessResponseDto {
  @Expose()
  recipeId: number;
}
