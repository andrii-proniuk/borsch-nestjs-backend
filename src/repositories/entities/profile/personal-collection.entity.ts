import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';
import { Recipe } from '../recipe/recipe.entity';
import { Profile } from './profile.entity';

@Entity(TABLES.PERSONAL_COLLECTIONS)
export class PersonalCollection {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_personal-collections_id',
  })
  id: number;

  @ManyToOne(() => Profile)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_personal-collections_profiles_owner-id',
  })
  owner: Profile;

  @Column()
  ownerId: number;

  @Column()
  name: string;

  @ManyToMany(() => Recipe)
  @JoinTable({
    name: TABLES.PERSONAL_COLLECTIONS_RECIPES,
    joinColumn: {
      name: 'collectionId',
      referencedColumnName: 'id',
      foreignKeyConstraintName:
        'fk_personal-collection-recipe_personal-collection_collection-id',
    },
    inverseJoinColumn: {
      name: 'recipeId',
      referencedColumnName: 'id',
      foreignKeyConstraintName:
        'fk_personal-collection-recipe_personal-collection_recipe-id',
    },
  })
  recipes: Recipe[];

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
