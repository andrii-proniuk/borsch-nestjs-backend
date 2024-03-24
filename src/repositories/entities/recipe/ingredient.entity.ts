import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';

export enum IngredientUnitsEnum {
  Gram = 'g',
  Milliliter = 'ml',
  Pieces = 'pcs',
  ToTaste = 'to-taste',
}

@Entity(TABLES.INGREDIENTS)
@Index('uniq_ingredients_name', ['name'], { unique: true })
export class Ingredient {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_ingredients_id',
  })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  units: IngredientUnitsEnum;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  recipesCount: number;

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
