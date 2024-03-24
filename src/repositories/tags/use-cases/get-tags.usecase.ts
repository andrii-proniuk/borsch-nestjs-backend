import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Tag } from '../../entities/recipe/tags.entity';

@Injectable()
export class GetTagsUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    whereOptions: FindOptionsWhere<Tag>,
    transactionManager?: EntityManager,
  ): Promise<Tag[]> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Tag).findBy(whereOptions);
  }
}
