import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { InnerRequest } from '../interfaces/inner-request.interface';
import { User } from '../../repositories/entities/user.entity';

export const GetUser = createParamDecorator(
  (property: keyof User | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<InnerRequest>();

    if (property) {
      return req.user[property];
    }

    return req.user;
  },
);
