import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';

@Entity(TABLES.RECIPE_INGREDIENTS)
// @Index(
//   'uniq_recipe-ingredients_recipe-id_ingredient-id',
//   ['recipeId', 'ingredientId'],
//   { unique: true },
// )
export class RecipeIngredient {
  // @ManyToOne(() => Recipe)
  // @JoinColumn({
  //   name: 'recipeId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_recipe-ingredients_recipes_recipe-id',
  // })
  // recipe: Recipe;

  @PrimaryColumn({
    primaryKeyConstraintName: 'pk_recipe-ingredients_recipe-id_ingredient-id',
  })
  recipeId: number;

  // @ManyToOne(() => Ingredient)
  // @JoinColumn({
  //   name: 'ingredientId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_recipe-ingredients_ingredients_ingredient-id',
  // })
  // ingredient: Ingredient;

  @PrimaryColumn({
    primaryKeyConstraintName: 'pk_recipe-ingredients_recipe-id_ingredient-id',
  })
  ingredientId: number;

  @Column({ type: 'integer' })
  amount: number;
}
