import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../core/postgresql/tables.constants';
import { User } from './user.entity';

@Entity(TABLES.PROFILES)
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  nickname: string;

  @Column()
  fullname: string;

  @CreateDateColumn({
    nullable: true,
    update: false,
    default: 'CURRENT_TIMESTAMP()',
  })
  createdAt: string;

  @UpdateDateColumn({
    nullable: true,
    default: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: string;
}
