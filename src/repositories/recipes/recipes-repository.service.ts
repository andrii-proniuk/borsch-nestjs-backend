import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateRecipeDto } from '../../recipes/dto/create-recipe.dto';
import { Recipe } from '../entities/recipe/recipe.entity';
import { CreateRecipeUseCase } from './use-cases/create-recipe.usecase';

@Injectable()
export class RecipesRepositoryService {
  constructor(private createRecipeUseCase: CreateRecipeUseCase) {}

  async create(
    authorId: number,
    createRecipeDto: CreateRecipeDto,
    transactionManager?: EntityManager,
  ): Promise<Recipe> {
    return this.createRecipeUseCase.exec(
      authorId,
      createRecipeDto,
      transactionManager,
    );
  }
}
