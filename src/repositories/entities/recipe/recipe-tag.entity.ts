import { Entity, PrimaryColumn } from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';

@Entity(TABLES.RECIPE_TAGS)
// @Index('uniq_recipe_tag', ['recipeId', 'tagId'], { unique: true })
export class RecipeTag {
  // @ManyToOne(() => Recipe)
  // @JoinColumn({
  //   name: 'recipeId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_recipe-tags_recipes_recipe-id',
  // })
  // recipe: Recipe;

  @PrimaryColumn({
    primaryKeyConstraintName: 'pk_recipe-tags_recipe-id_tag-id',
  })
  recipeId: number;

  // @ManyToOne(() => Tag)
  // @JoinColumn({
  //   name: 'tagId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_recipe-tags_tags_tag-id',
  // })
  // tag: Tag;

  @PrimaryColumn({
    primaryKeyConstraintName: 'pk_recipe-tags_recipe-id_tag-id',
  })
  tagId: number;
}
