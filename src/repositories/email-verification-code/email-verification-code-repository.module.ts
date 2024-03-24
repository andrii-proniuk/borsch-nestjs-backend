import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerificationCode } from '../entities/user/email-verification-code.entity';
import { EmailVerificationCodeRepositoryService } from './email-verification-code-repository.service';
import { CreateEmailVerificationCodeUseCase } from './use-cases/create-email-verification-code.usecase';
import { GetEmailVerificationCodeUseCase } from './use-cases/get-email-verification-code.usecase';
import { DeleteEmailVerificationCodeByUserIdUseCase } from './use-cases/delete-email-verification-code-by-user-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerificationCode])],
  providers: [
    EmailVerificationCodeRepositoryService,
    CreateEmailVerificationCodeUseCase,
    GetEmailVerificationCodeUseCase,
    DeleteEmailVerificationCodeByUserIdUseCase,
  ],
  exports: [EmailVerificationCodeRepositoryService],
})
export class EmailVerificationCodeRepositoryModule {}
