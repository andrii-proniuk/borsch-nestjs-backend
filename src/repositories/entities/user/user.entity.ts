import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';
import { Profile } from '../profile/profile.entity';

export enum UserRoleEnum {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user',
}

@Entity(TABLES.USERS)
@Index('uniq_users_email', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_users_id',
  })
  id: number;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @Column()
  email: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  emailVerified: boolean;

  @Column()
  password: string;

  @Column({ nullable: true })
  role: UserRoleEnum;

  @Column({ nullable: true })
  refreshToken: string;

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
