import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RecipesRepositoryService } from '../repositories/recipes/recipes-repository.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CreateRecipeResponseDto } from './response-dto/create-recipe.response-dto';

@Injectable()
export class RecipesService {
  constructor(private recipesRepositoryService: RecipesRepositoryService) {}

  async create(
    authorId: number,
    createRecipeDto: CreateRecipeDto,
  ): Promise<CreateRecipeResponseDto> {
    const recipeId = await this.recipesRepositoryService.create(
      authorId,
      createRecipeDto,
    );

    return plainToInstance(CreateRecipeResponseDto, {
      recipeId,
    });
  }
}
