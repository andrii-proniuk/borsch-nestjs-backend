import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { AUTH_ERRORS } from '../auth.constants';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { JwtConfig } from '../../config/configuration.types';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private secret: string;

  constructor(
    configService: ConfigService,
    private jwtService: JwtService,
    private usersRepositoryService: UsersRepositoryService,
  ) {
    this.secret = configService.get<JwtConfig>('jwt').accessTokenSecret;
  }

  private extractBearerToken(req: InnerRequest): string | undefined {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return undefined;
    }

    const [bearer, token] = req.headers['authorization']?.split(' ');

    return bearer === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const token = this.extractBearerToken(req);

    if (!token) {
      throw new ForbiddenException(AUTH_ERRORS.INVALID_ACCESS_TOKEN);
    }

    try {
      const { id } = await this.jwtService.verifyAsync<ITokenPayload>(token, {
        secret: this.secret,
      });

      req.user = await this.usersRepositoryService.getById(id, true);
    } catch {
      throw new ForbiddenException(AUTH_ERRORS.INVALID_ACCESS_TOKEN);
    }

    return true;
  }
}
