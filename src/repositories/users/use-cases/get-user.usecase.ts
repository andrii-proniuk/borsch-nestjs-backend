import { Injectable } from '@nestjs/common';
import { EntityManager, FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    whereOptions: FindOptionsWhere<User>,
    relations?: FindOptionsRelations<User>,
    transactionManager?: EntityManager,
  ): Promise<User> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager
      .getRepository(User)
      .findOne({ where: whereOptions, relations });
  }
}
