import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Community } from '../../entities/community/community.entity';

@Injectable()
export class GetCommunityUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    whereOptions: FindOptionsWhere<Community>,
    transactionManager?: EntityManager,
  ): Promise<Community> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Community).findOneBy(whereOptions);
  }
}
