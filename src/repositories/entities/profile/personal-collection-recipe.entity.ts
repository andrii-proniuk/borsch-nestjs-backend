import { Entity, PrimaryColumn } from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';

@Entity(TABLES.PERSONAL_COLLECTIONS_RECIPES)
export class PersonalCollectionRecipe {
  // @ManyToOne(() => PersonalCollection)
  // @JoinColumn({
  //   name: 'collectionId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName:
  //     'fk_personal-collection-recipe_personal-collection_collection-id',
  // })
  // collection: PersonalCollection;

  @PrimaryColumn({
    primaryKeyConstraintName:
      'pk_personal-collection-recipes_collection-id_recipe-id',
  })
  collectionId: number;

  // @ManyToOne(() => Recipe)
  // @JoinColumn({
  //   name: 'recipeId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName:
  //     'fk_personal-collection-recipe_personal-collection_recipe-id',
  // })
  // recipe: Recipe;

  @PrimaryColumn({
    primaryKeyConstraintName:
      'pk_personal-collection-recipes_collection-id_recipe-id',
  })
  recipeId: number;
}
