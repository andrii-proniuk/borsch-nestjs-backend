import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';
import { Profile } from '../profile/profile.entity';
import { Community } from '../community/community.entity';
import { Ingredient } from './ingredient.entity';
import { Tag } from './tags.entity';
import { RecipeStep } from './recipe-step.entity';

@Entity(TABLES.RECIPES)
export class Recipe {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_recipes_id',
  })
  id: number;

  @ManyToOne(() => Profile)
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_recipes_profiles_author-id',
  })
  author: Profile;

  @Column()
  authorId: number;

  @ManyToOne(() => Community)
  @JoinColumn({
    name: 'community_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_recipes_communities_community-id',
  })
  community: Community;

  @Column()
  communityId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Ingredient)
  @JoinTable({
    name: TABLES.RECIPE_INGREDIENTS,
    joinColumn: {
      name: 'ingredientId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_recipe-ingredients_ingredient-id',
    },
    inverseJoinColumn: {
      name: 'recipeId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_recipe-ingredients_recipe-id',
    },
  })
  ingredients: Ingredient[];

  @OneToMany(() => RecipeStep, (recipeStep) => recipeStep.recipe)
  steps: RecipeStep[];

  @ManyToMany(() => Tag)
  @JoinTable({
    name: TABLES.RECIPE_TAGS,
    joinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_recipe-tags_tag-id',
    },
    inverseJoinColumn: {
      name: 'recipeId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_recipe-tags_recipe-id',
    },
  })
  tags: Tag[];
}
