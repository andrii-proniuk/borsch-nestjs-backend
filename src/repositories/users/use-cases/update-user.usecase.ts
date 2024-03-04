import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeepPartial, EntityManager } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    id: number,
    data: DeepPartial<User>,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const entityManager = transactionManager || this.globalEntityManager;

    await entityManager.getRepository(User).update({ id }, data);
  }
}
