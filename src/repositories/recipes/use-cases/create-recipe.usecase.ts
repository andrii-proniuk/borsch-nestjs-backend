import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeepPartial, EntityManager } from 'typeorm';
import { CreateRecipeDto } from '../../../recipes/dto/create-recipe.dto';
import { Recipe } from '../../entities/recipe/recipe.entity';
import { RecipeIngredient } from '../../entities/recipe/recipe-ingredient.entity';
import { RecipeStep } from '../../entities/recipe/recipe-step.entity';
import { RecipeTag } from '../../entities/recipe/recipe-tag.entity';

@Injectable()
export class CreateRecipeUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  private createRecipe(
    authorId: number,
    { name, description }: CreateRecipeDto,
    entityManager: EntityManager,
  ): Promise<Recipe> {
    const recipe = new Recipe();
    recipe.authorId = authorId;
    recipe.name = name;
    recipe.description = description;

    return entityManager.getRepository(Recipe).save(recipe);
  }

  private async createRecipeIngredients(
    recipeId: number,
    ingredients: CreateRecipeDto['ingredients'],
    entityManager: EntityManager,
  ): Promise<void> {
    const ingredientsToSave: DeepPartial<RecipeIngredient>[] = ingredients.map(
      ({ id, amount }) => ({ recipeId, ingredientId: id, amount }),
    );

    await entityManager
      .getRepository(RecipeIngredient)
      .insert(ingredientsToSave);
  }

  private async createRecipeSteps(
    recipeId: number,
    steps: CreateRecipeDto['steps'],
    entityManager: EntityManager,
  ): Promise<void> {
    const recipeStepsToSave = steps.map(({ title, text }) => ({
      recipeId,
      title,
      text,
    }));

    await entityManager.getRepository(RecipeStep).insert(recipeStepsToSave);
  }

  private async addTagsToRecipe(
    recipeId: number,
    tags: CreateRecipeDto['tags'],
    entityManager: EntityManager,
  ): Promise<void> {
    const recipeTagsToSave = tags.map((tagId) => ({ recipeId, tagId }));

    await entityManager.getRepository(RecipeTag).insert(recipeTagsToSave);
  }

  private getRecipeWithRelations(
    recipeId: number,
    entityManager: EntityManager,
  ): Promise<Recipe> {
    return entityManager.getRepository(Recipe).findOne({
      where: { id: recipeId },
      relations: {
        ingredients: {},
      },
    });
  }

  async exec(
    authorId: number,
    createRecipeDto: CreateRecipeDto,
    transactionManager?: EntityManager,
  ): Promise<Recipe> {
    const entityManager = transactionManager || this.globalEntityManager;
    const recipe = await this.createRecipe(
      authorId,
      createRecipeDto,
      entityManager,
    );

    await this.createRecipeIngredients(
      recipe.id,
      createRecipeDto.ingredients,
      entityManager,
    );

    await this.createRecipeSteps(
      recipe.id,
      createRecipeDto.steps,
      entityManager,
    );

    await this.addTagsToRecipe(recipe.id, createRecipeDto.tags, entityManager);

    return this.getRecipeWithRelations(recipe.id, entityManager);
  }
}
