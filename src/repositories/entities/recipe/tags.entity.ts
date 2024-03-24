import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';

@Entity(TABLES.TAGS)
@Index('uniq_tag_name', ['name'], { unique: true })
export class Tag {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_tags_id',
  })
  id: number;

  @Column()
  name: string;

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
