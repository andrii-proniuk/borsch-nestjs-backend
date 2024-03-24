import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EmailVerificationCode } from '../../entities/user/email-verification-code.entity';
import { VERIFICATION_CODE_LENGTH } from '../../../auth/auth.constants';

@Injectable()
export class CreateEmailVerificationCodeUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    userId: number,
    transactionManager?: EntityManager,
  ): Promise<EmailVerificationCode> {
    const entityManager = transactionManager || this.globalEntityManager;

    const code = crypto.randomBytes(VERIFICATION_CODE_LENGTH).toString('hex');

    const emailVerificationCode = new EmailVerificationCode();
    emailVerificationCode.userId = userId;
    emailVerificationCode.code = code;

    return entityManager
      .getRepository(EmailVerificationCode)
      .save(emailVerificationCode);
  }
}
