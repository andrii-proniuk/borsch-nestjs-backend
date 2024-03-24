import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Profile } from '../../entities/profile/profile.entity';
import { SignUpDto } from '../../../auth/dto/sign-up.dto';
import { User } from '../../entities/user/user.entity';

@Injectable()
export class CreateProfileUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    user: User,
    { nickname }: SignUpDto,
    transactionManager?: EntityManager,
  ): Promise<Profile> {
    const entityManager = transactionManager || this.globalEntityManager;

    const profile = new Profile();
    profile.user = user;
    profile.nickname = nickname;

    return entityManager.getRepository(Profile).save(profile);
  }
}
