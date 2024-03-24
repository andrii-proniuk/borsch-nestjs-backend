import { Module } from '@nestjs/common';
import { UsersRepositoryModule } from '../repositories/users/users-repository.module';
import { ProfilesRepositoryModule } from '../repositories/profiles/profiles-repository.module';
import { EmailVerificationCodeRepositoryModule } from '../repositories/email-verification-code/email-verification-code-repository.module';
import { EmailModule } from '../email/email.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersRepositoryModule,
    ProfilesRepositoryModule,
    EmailVerificationCodeRepositoryModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
