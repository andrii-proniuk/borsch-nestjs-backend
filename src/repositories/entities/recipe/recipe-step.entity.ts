import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';
import { Recipe } from './recipe.entity';

@Entity(TABLES.RECIPE_STEPS)
export class RecipeStep {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_recipe-steps_id',
  })
  id: number;

  @ManyToOne(() => Recipe)
  @JoinColumn({
    name: 'recipeId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_recipe-steps_recipes_recipe-id',
  })
  recipe: Recipe;

  @Column()
  recipeId: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @CreateDateColumn({
    nullable: true,
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
