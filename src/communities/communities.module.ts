import { Module } from '@nestjs/common';
import { CommunitiesRepositoryModule } from '../repositories/communities/communities-repository.module';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

@Module({
  imports: [CommunitiesRepositoryModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
})
export class CommunitiesModule {}
