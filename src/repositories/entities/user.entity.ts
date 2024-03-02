import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../core/postgresql/tables.constants';
import { Profile } from './profile.entity';

export enum UserRoleEnum {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user',
}

@Entity(TABLES.USERS)
export class User {
  @PrimaryGeneratedColumn()
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
