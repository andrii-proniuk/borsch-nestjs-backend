import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ValidatePayloadNotEmptyPipe } from '../common/pipes/validate-payload-not-empty.pipe';
import { Locals } from '../common/decorators/locals.decorator';
import { User } from '../repositories/entities/user.entity';
import { EmailVerificationCode } from '../repositories/entities/email-verification-code.entity';
import { DefaultSuccessResponseDto } from '../common/response-dto/default-success.response-dto';
import { AuthService } from './auth.service';
import { SignUpResponseDto } from './response-dto/sign-up.response-dto';
import { EmailAvailabilityGuard } from './guards/email-availability.guard';
import { NicknameAvailabilityGuard } from './guards/nickname-availability.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { EmailExistsGuard } from './guards/email-exists.guard';
import { PasswordCorrectGuard } from './guards/password-correct.guard';
import { SignInResponseDto } from './response-dto/sign-in.response-dto';
import { EmailVerificationCodeValidGuard } from './guards/email-verification-code-valid.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseGuards(EmailAvailabilityGuard, NicknameAvailabilityGuard)
  async signUp(
    @Body(ValidatePayloadNotEmptyPipe) signUpDto: SignUpDto,
  ): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @UseGuards(EmailExistsGuard, PasswordCorrectGuard)
  async signIn(@Locals('user') user: User): Promise<SignInResponseDto> {
    return this.authService.singIn(user);
  }

  @Get('verify-email')
  @UseGuards(EmailVerificationCodeValidGuard)
  async verifyEmail(
    @Locals('emailVerificationCode') code: EmailVerificationCode,
  ): Promise<DefaultSuccessResponseDto> {
    return this.authService.verifyEmail(code);
  }
}
