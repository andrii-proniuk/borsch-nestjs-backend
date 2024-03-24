import { Entity, PrimaryColumn } from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';
// import { Profile } from './profile.entity';

@Entity(TABLES.PROFILE_FOLLOWERS)
// @Index('uniq_profile_follower', ['followerId', 'followingId'], { unique: true })
export class ProfileFollower {
  // @ManyToOne(() => Profile)
  // @JoinColumn({
  //   name: 'followerId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_profile-followers_profiles_follower',
  // })
  // follower: Profile;

  @PrimaryColumn({
    primaryKeyConstraintName: 'pk_profile-followers_follower-id_following-id',
  })
  followerId: number;

  // @ManyToOne(() => Profile)
  // @JoinColumn({
  //   name: 'followingId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_profile-followers_profiles_following',
  // })
  // following: Profile;

  @PrimaryColumn({
    primaryKeyConstraintName: 'pk_profile-followers_follower-id_following-id',
  })
  followingId: number;
}
