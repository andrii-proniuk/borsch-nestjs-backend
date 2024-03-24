import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '../entities/recipe/recipe.entity';
import { RecipeIngredient } from '../entities/recipe/recipe-ingredient.entity';
import { RecipeStep } from '../entities/recipe/recipe-step.entity';
import { RecipeTag } from '../entities/recipe/recipe-tag.entity';
import { RecipesRepositoryService } from './recipes-repository.service';
import { CreateRecipeUseCase } from './use-cases/create-recipe.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipeIngredient, RecipeStep, RecipeTag]),
  ],
  providers: [RecipesRepositoryService, CreateRecipeUseCase],
  exports: [RecipesRepositoryService],
})
export class RecipesRepositoryModule {}
