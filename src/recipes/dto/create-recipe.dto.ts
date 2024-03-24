import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  RECIPE_DESCRIPTION_MAX_LENGTH,
  RECIPE_DESCRIPTION_MIN_LENGTH,
  RECIPE_INGREDIENTS_ARRAY_MAX_SIZE,
  RECIPE_INGREDIENTS_ARRAY_MIN_SIZE,
  RECIPE_NAME_MAX_LENGTH,
  RECIPE_NAME_MIN_LENGTH,
  RECIPE_STEPS_ARRAY_MAX_SIZE,
  RECIPE_STEPS_ARRAY_MIN_SIZE,
  RECIPE_STEP_TEXT_MAX_LENGTH,
  RECIPE_STEP_TEXT_MIN_LENGTH,
  RECIPE_STEP_TITLE_MAX_LENGTH,
  RECIPE_STEP_TITLE_MIN_LENGTH,
  RECIPE_TAGS_ARRAY_MAX_SIZE,
  RECIPE_TAGS_ARRAY_MIN_SIZE,
} from '../recipes.constants';

class IngredientDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  amount: number;
}

class RecipeStepDto {
  @IsNotEmpty()
  @IsString()
  @Length(RECIPE_STEP_TITLE_MIN_LENGTH, RECIPE_STEP_TITLE_MAX_LENGTH)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(RECIPE_STEP_TEXT_MIN_LENGTH, RECIPE_STEP_TEXT_MAX_LENGTH)
  text: string;
}

export class CreateRecipeDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  communityId?: number;

  @IsNotEmpty()
  @IsString()
  @Length(RECIPE_NAME_MIN_LENGTH, RECIPE_NAME_MAX_LENGTH)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(RECIPE_DESCRIPTION_MIN_LENGTH, RECIPE_DESCRIPTION_MAX_LENGTH)
  description: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => IngredientDto)
  @ValidateNested()
  @ArrayMinSize(RECIPE_INGREDIENTS_ARRAY_MIN_SIZE)
  @ArrayMaxSize(RECIPE_INGREDIENTS_ARRAY_MAX_SIZE)
  ingredients: IngredientDto[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => RecipeStepDto)
  @ValidateNested()
  @ArrayMinSize(RECIPE_STEPS_ARRAY_MIN_SIZE)
  @ArrayMaxSize(RECIPE_STEPS_ARRAY_MAX_SIZE)
  steps: RecipeStepDto[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @ArrayMinSize(RECIPE_TAGS_ARRAY_MIN_SIZE)
  @ArrayMaxSize(RECIPE_TAGS_ARRAY_MAX_SIZE)
  tags: number[];
}
