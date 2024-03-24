import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';
import { User } from '../user/user.entity';

@Entity(TABLES.PROFILES)
@Index('uniq_profile_nickname', ['nickname'], { unique: true })
export class Profile {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_profiles_id',
  })
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_profiles_users_user-id',
  })
  user: User;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  fullname: string;

  @ManyToMany(() => Profile)
  @JoinTable({
    name: TABLES.PROFILE_FOLLOWERS,
    joinColumn: {
      name: 'followerId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_profile-followers_profiles_follower',
    },
    inverseJoinColumn: {
      name: 'followingId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_profile-followers_profiles_following',
    },
  })
  followers: Profile;

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
