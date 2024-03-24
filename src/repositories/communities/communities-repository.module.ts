import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from '../entities/community/community.entity';
import { CommunitiesRepositoryService } from './communities-repository.service';
import { CreateCommunityUseCase } from './use-cases/create-community.usecase';
import { GetCommunitiesUseCase } from './use-cases/get-communities.usecase';
import { GetCommunityUseCase } from './use-cases/get-community.usecase';
import { SearchCommunitiesUseCase } from './use-cases/search-communities.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Community])],
  providers: [
    CommunitiesRepositoryService,
    CreateCommunityUseCase,
    GetCommunitiesUseCase,
    GetCommunityUseCase,
    SearchCommunitiesUseCase,
  ],
  exports: [CommunitiesRepositoryService],
})
export class CommunitiesRepositoryModule {}
