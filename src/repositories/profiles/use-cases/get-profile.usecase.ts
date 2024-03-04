import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class GetProfileUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    whereOptions: FindOptionsWhere<Profile>,
    transactionManager?: EntityManager,
  ): Promise<Profile> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Profile).findOneBy(whereOptions);
  }
}
