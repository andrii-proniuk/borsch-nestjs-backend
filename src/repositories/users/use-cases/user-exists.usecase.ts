import { Injectable } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserExistsUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    whereOptions: FindOptionsWhere<User>,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(User).existsBy(whereOptions);
  }
}
