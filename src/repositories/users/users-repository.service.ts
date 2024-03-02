import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { User } from '../entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UserExistsUseCase } from './use-cases/user-exists.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';

@Injectable()
export class UsersRepositoryService {
  // eslint-disable-next-line max-params
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private userExistsUseCase: UserExistsUseCase,
    private getUserUseCase: GetUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async create(
    signUpDto: SignUpDto,
    transactionManager?: EntityManager,
  ): Promise<User> {
    return this.createUserUseCase.exec(signUpDto, transactionManager);
  }

  async existsByEmail(
    email: string,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    return this.userExistsUseCase.exec({ email }, transactionManager);
  }

  async getByEmail(
    email: string,
    withProfile?: boolean,
    transactionManager?: EntityManager,
  ): Promise<User> {
    return this.getUserUseCase.exec(
      { email },
      withProfile && { profile: true },
      transactionManager,
    );
  }

  async setUserEmailAsVerified(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<void> {
    return this.updateUserUseCase.exec(
      id,
      { emailVerified: true },
      transactionManager,
    );
  }
}
