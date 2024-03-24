import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TABLES } from '../../../core/postgresql/tables.constants';
import { Profile } from '../profile/profile.entity';
import { Community } from './community.entity';

export enum CommunityFollowerRoleEnum {
  Owner = 'owner',
  Admin = 'admin',
  Moderator = 'moderator',
  Follower = 'follower',
}

@Entity(TABLES.COMMUNITY_FOLLOWERS)
// @Index(
//   'uniq_community-follower_community-id_profile-id',
//   ['communityId', 'profileId'],
//   {
//     unique: true,
//   },
// )
export class CommunityFollower {
  @ManyToOne(() => Community)
  @JoinColumn({
    name: 'communityId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_community-follower_community-id',
  })
  community: Community;

  @PrimaryColumn({
    primaryKeyConstraintName: 'pk_community-followers_community-id_profile-id',
  })
  communityId: number;

  @ManyToOne(() => Profile)
  @JoinColumn({
    name: 'profileId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_community-follower_profile-id',
  })
  profile: Profile;

  @PrimaryColumn({
    primaryKeyConstraintName: 'pk_community-followers_community-id_profile-id',
  })
  profileId: number;

  @Column({ type: 'varchar', default: CommunityFollowerRoleEnum.Follower })
  role: CommunityFollowerRoleEnum;
}
