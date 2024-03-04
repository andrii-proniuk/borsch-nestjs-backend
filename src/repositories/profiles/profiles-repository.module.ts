import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { ProfilesRepositoryService } from './profiles-repository.service';
import { CreateProfileUseCase } from './use-cases/create-profile.usecase';
import { ProfileExistsUseCase } from './use-cases/profile-exists.usecase';
import { GetProfileUseCase } from './use-cases/get-profile.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [
    ProfilesRepositoryService,
    CreateProfileUseCase,
    ProfileExistsUseCase,
    GetProfileUseCase,
  ],
  exports: [ProfilesRepositoryService],
})
export class ProfilesRepositoryModule {}
