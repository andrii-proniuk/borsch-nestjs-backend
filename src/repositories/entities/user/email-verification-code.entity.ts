import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';
import { User } from './user.entity';

@Entity(TABLES.EMAIL_VERIFICATION_CODES)
export class EmailVerificationCode {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_email-verification-codes_id',
  })
  id: number;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_email-verification-codes_users_user-id',
  })
  user: User;

  @Column()
  userId: number;

  @Column()
  code: string;

  @CreateDateColumn({
    nullable: true,
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
}
