import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidatePayloadNotEmptyPipe } from '../common/pipes/validate-payload-not-empty.pipe';
import { Locals } from '../common/decorators/locals.decorator';
import { User } from '../repositories/entities/user.entity';
import { EmailVerificationCode } from '../repositories/entities/email-verification-code.entity';
import { DefaultSuccessResponseDto } from '../common/response-dto/default-success.response-dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { AuthService } from './auth.service';
import { SignUpResponseDto } from './response-dto/sign-up.response-dto';
import { EmailAvailabilityGuard } from './guards/email-availability.guard';
import { NicknameAvailabilityGuard } from './guards/nickname-availability.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { UserExistsByEmailGuard } from './guards/user-exists-by-email.guard';
import { PasswordCorrectGuard } from './guards/password-correct.guard';
import { SignInResponseDto } from './response-dto/sign-in.response-dto';
import { EmailVerificationCodeValidGuard } from './guards/email-verification-code-valid.guard';
import { SignInDto } from './dto/sign-in.dto';
import { ValidRefreshTokenGuard } from './guards/valid-refresh-token.guard';
import { RefreshTokensResponseDto } from './response-dto/refresh-tokens.response-dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseGuards(NicknameAvailabilityGuard, EmailAvailabilityGuard)
  async signUp(
    @Body(ValidatePayloadNotEmptyPipe) signUpDto: SignUpDto,
  ): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @UseGuards(UserExistsByEmailGuard, PasswordCorrectGuard)
  async signIn(
    @Body(ValidatePayloadNotEmptyPipe) signInDto: SignInDto,
    @Locals('user') user: User,
  ): Promise<SignInResponseDto> {
    return this.authService.singIn(user);
  }

  @Get('verify-email')
  @UseGuards(EmailVerificationCodeValidGuard)
  async verifyEmail(
    @Locals('emailVerificationCode')
    code: EmailVerificationCode,
  ): Promise<DefaultSuccessResponseDto> {
    return this.authService.verifyEmail(code);
  }

  @ApiBearerAuth('refresh')
  @Get('refresh')
  @UseGuards(ValidRefreshTokenGuard)
  async refreshTokens(
    @GetUser() user: User,
  ): Promise<RefreshTokensResponseDto> {
    return this.authService.refreshTokens(user);
  }

  @ApiBearerAuth('default')
  @Get('test-auth')
  @UseGuards(AuthGuard)
  async testAuth(): Promise<any> {
    return "You're authorized";
  }
}
