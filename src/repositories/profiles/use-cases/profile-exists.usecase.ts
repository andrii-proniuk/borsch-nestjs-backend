import { Injectable } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Profile } from '../../entities/profile/profile.entity';

@Injectable()
export class ProfileExistsUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    whereOptions: FindOptionsWhere<Profile>,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Profile).existsBy(whereOptions);
  }
}
