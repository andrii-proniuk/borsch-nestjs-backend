import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { ForbiddenException } from '../../common/exceptions/http.exception';
import { AUTH_ERRORS } from '../auth.constants';
import { JwtConfig } from '../../config/configuration.types';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class ValidRefreshTokenGuard implements CanActivate {
  private secret: string;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersRepositoryService: UsersRepositoryService,
  ) {
    this.secret = this.configService.get<JwtConfig>('jwt').refreshTokenSecret;
  }

  private extractBearerToken(req: InnerRequest): string | undefined {
    const [bearer, token] = req.headers['authorization']?.split(' ') || [];

    return bearer === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const token = this.extractBearerToken(req);

    if (!token) {
      throw new ForbiddenException(AUTH_ERRORS.INVALID_REFRESH_TOKEN);
    }

    try {
      const { id } = await this.jwtService.verifyAsync<ITokenPayload>(token, {
        secret: this.secret,
      });

      req.user = await this.usersRepositoryService.getById(id, true);
    } catch {
      throw new ForbiddenException(AUTH_ERRORS.INVALID_REFRESH_TOKEN);
    }

    if (req.user.refreshToken !== token) {
      throw new ForbiddenException(AUTH_ERRORS.INVALID_REFRESH_TOKEN);
    }

    return true;
  }
}
