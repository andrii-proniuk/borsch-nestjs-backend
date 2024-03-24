import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EmailVerificationCode } from '../../entities/user/email-verification-code.entity';

@Injectable()
export class DeleteEmailVerificationCodeByUserIdUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    userId: number,
    transactionManager?: EntityManager,
  ): Promise<void> {
    const entityManager = transactionManager || this.globalEntityManager;

    await entityManager.getRepository(EmailVerificationCode).delete({ userId });
  }
}
