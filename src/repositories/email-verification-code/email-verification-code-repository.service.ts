import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { EmailVerificationCode } from '../entities/user/email-verification-code.entity';
import { CreateEmailVerificationCodeUseCase } from './use-cases/create-email-verification-code.usecase';
import { GetEmailVerificationCodeUseCase } from './use-cases/get-email-verification-code.usecase';
import { DeleteEmailVerificationCodeByUserIdUseCase } from './use-cases/delete-email-verification-code-by-user-id.usecase';

@Injectable()
export class EmailVerificationCodeRepositoryService {
  constructor(
    private createEmailVerificationCodeUseCase: CreateEmailVerificationCodeUseCase,
    private getEmailVerificationCodeUseCase: GetEmailVerificationCodeUseCase,
    private deleteEmailVerificationCodeByUserIdUseCase: DeleteEmailVerificationCodeByUserIdUseCase,
  ) {}

  async create(
    userId: number,
    transactionManager?: EntityManager,
  ): Promise<EmailVerificationCode> {
    return this.createEmailVerificationCodeUseCase.exec(
      userId,
      transactionManager,
    );
  }

  async getByCode(
    code: string,
    transactionManager?: EntityManager,
  ): Promise<EmailVerificationCode> {
    return this.getEmailVerificationCodeUseCase.exec(
      { code },
      transactionManager,
    );
  }

  async getByUserId(
    userId: number,
    transactionManager?: EntityManager,
  ): Promise<EmailVerificationCode> {
    return this.getEmailVerificationCodeUseCase.exec(
      { userId },
      transactionManager,
    );
  }

  async delete(
    userId: number,
    transactionManager?: EntityManager,
  ): Promise<void> {
    return this.deleteEmailVerificationCodeByUserIdUseCase.exec(
      userId,
      transactionManager,
    );
  }
}
