import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user/user.entity';
import { UsersRepositoryService } from './users-repository.service';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UserExistsUseCase } from './use-cases/user-exists.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersRepositoryService,
    CreateUserUseCase,
    UserExistsUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
  ],
  exports: [UsersRepositoryService],
})
export class UsersRepositoryModule {}
