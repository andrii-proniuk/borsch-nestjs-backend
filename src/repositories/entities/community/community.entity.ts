import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';

@Entity(TABLES.COMMUNITIES)
@Index('uniq_communities_name', ['name'], { unique: true })
export class Community {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_communities_id',
  })
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ default: 1 })
  membersCount: number;

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
