import { Request } from 'express';
import { EmailVerificationCode } from '../../repositories/entities/email-verification-code.entity';
import { User } from '../../repositories/entities/user.entity';

export interface InnerRequestLocals {
  emailVerificationCode?: EmailVerificationCode;
  user?: User;
}

export interface InnerRequest extends Request {
  user: User;
  locals: InnerRequestLocals;
}
