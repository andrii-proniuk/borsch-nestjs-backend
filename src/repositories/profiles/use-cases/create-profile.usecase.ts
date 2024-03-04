import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Profile } from '../../entities/profile.entity';
import { SignUpDto } from '../../../auth/dto/sign-up.dto';

@Injectable()
export class CreateProfileUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    userId: number,
    { nickname }: SignUpDto,
    transactionManager?: EntityManager,
  ): Promise<Profile> {
    const entityManager = transactionManager || this.globalEntityManager;

    const profile = new Profile();
    profile.userId = userId;
    profile.nickname = nickname;

    return entityManager.getRepository(Profile).save(profile);
  }
}
