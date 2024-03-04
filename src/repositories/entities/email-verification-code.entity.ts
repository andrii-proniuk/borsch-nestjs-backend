import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TABLES } from '../../core/postgresql/tables.constants';
import { User } from './user.entity';

@Entity(TABLES.EMAIL_VERIFICATION_CODES)
export class EmailVerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  code: string;

  @CreateDateColumn({
    nullable: true,
    update: false,
    default: 'current_timestamp()',
  })
  createdAt: string;
}
