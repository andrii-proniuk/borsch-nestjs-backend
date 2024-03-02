import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { EmailVerificationCode } from '../../entities/email-verification-code.entity';

@Injectable()
export class GetEmailVerificationCodeUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    whereOptions: FindOptionsWhere<EmailVerificationCode>,
    transactionManager?: EntityManager,
  ): Promise<EmailVerificationCode> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager
      .getRepository(EmailVerificationCode)
      .findOneBy(whereOptions);
  }
}
