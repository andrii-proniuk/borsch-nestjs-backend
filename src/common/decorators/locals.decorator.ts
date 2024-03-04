import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import {
  InnerRequest,
  InnerRequestLocals,
} from '../interfaces/inner-request.interface';

export const Locals = createParamDecorator(
  (property: keyof InnerRequestLocals, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<InnerRequest>();

    return req.locals[property];
  },
);
