import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { Profile } from '../entities/profile/profile.entity';
import { User } from '../entities/user/user.entity';
import { CreateProfileUseCase } from './use-cases/create-profile.usecase';
import { ProfileExistsUseCase } from './use-cases/profile-exists.usecase';
import { GetProfileUseCase } from './use-cases/get-profile.usecase';

@Injectable()
export class ProfilesRepositoryService {
  constructor(
    private createProfileUseCase: CreateProfileUseCase,
    private profileExistsUseCase: ProfileExistsUseCase,
    private getProfileUseCase: GetProfileUseCase,
  ) {}

  async create(
    user: User,
    signUpDto: SignUpDto,
    transactionManager?: EntityManager,
  ): Promise<Profile> {
    return this.createProfileUseCase.exec(user, signUpDto, transactionManager);
  }

  async existsById(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    return this.profileExistsUseCase.exec({ id }, transactionManager);
  }

  async existsByNickname(
    nickname: string,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    return this.profileExistsUseCase.exec({ nickname }, transactionManager);
  }

  async getById(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<Profile> {
    return this.getProfileUseCase.exec({ id }, transactionManager);
  }
}
