import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { UsersRepositoryService } from '../repositories/users/users-repository.service';
import { ProfilesRepositoryService } from '../repositories/profiles/profiles-repository.service';
import { TransactionService } from '../core/postgresql/transaction.service';
import { EmailVerificationCodeRepositoryService } from '../repositories/email-verification-code/email-verification-code-repository.service';
import { EmailVerificationCode } from '../repositories/entities/email-verification-code.entity';
import { DefaultSuccessResponseDto } from '../common/response-dto/default-success.response-dto';
import { JwtConfig } from '../config/configuration.types';
import { User } from '../repositories/entities/user.entity';
import { SignUpResponseDto } from './response-dto/sign-up.response-dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInResponseDto } from './response-dto/sign-in.response-dto';
import { RefreshTokensResponseDto } from './response-dto/refresh-tokens.response-dto';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  // eslint-disable-next-line max-params
  constructor(
    private configService: ConfigService,
    private transactionService: TransactionService,
    private usersRepositoryService: UsersRepositoryService,
    private profilesRepositoryService: ProfilesRepositoryService,
    private emailVerificationCodeRepositoryService: EmailVerificationCodeRepositoryService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.transactionService.transaction(async (transactionManager) => {
      const user = await this.usersRepositoryService.create(
        signUpDto,
        transactionManager,
      );

      await this.profilesRepositoryService.create(
        user.id,
        signUpDto,
        transactionManager,
      );

      // const { code } = await this.emailVerificationCodeRepositoryService.create(
      //   user.id,
      //   transactionManager,
      // );

      // await this.emailService.sendEmailVerificationCode(user.email, code);

      return new SignUpResponseDto();
    });
  }

  async verifyEmail(
    emailVerificationCode: EmailVerificationCode,
  ): Promise<DefaultSuccessResponseDto> {
    return this.transactionService.transaction(async (transactionManager) => {
      await this.usersRepositoryService.setUserEmailAsVerified(
        emailVerificationCode.userId,
        transactionManager,
      );

      await this.emailVerificationCodeRepositoryService.delete(
        emailVerificationCode.userId,
      );

      return new DefaultSuccessResponseDto();
    });
  }

  private async generateTokens(user: User): Promise<Tokens> {
    const payload = {
      id: user.id,
    };

    const {
      accessTokenSecret,
      accessTokenExpirationTime,
      refreshTokenSecret,
      refreshTokenExpirationTime,
    } = this.configService.get<JwtConfig>('jwt');

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessTokenSecret,
      expiresIn: accessTokenExpirationTime,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpirationTime,
    });

    await this.usersRepositoryService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async singIn(user: User): Promise<SignInResponseDto> {
    const tokens = await this.generateTokens(user);

    return plainToInstance(SignInResponseDto, {
      ...tokens,
      profile: user.profile,
    });
  }

  async refreshTokens(user: User): Promise<RefreshTokensResponseDto> {
    const tokens = await this.generateTokens(user);

    return plainToInstance(RefreshTokensResponseDto, {
      ...tokens,
      profile: user.profile,
    });
  }
}
