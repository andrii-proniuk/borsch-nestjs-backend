import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommunitiesRepositoryService } from '../repositories/communities/communities-repository.service';
import { CreateCommunityResponseDto } from './response-dto/create-community.response-dto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { SearchCommunitiesResponseDto } from './response-dto/search-community.response-dto';
import { SearchCommunitiesDto } from './dto/search-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    private communitiesRepositoryService: CommunitiesRepositoryService,
  ) {}

  async create(
    createCommunityDto: CreateCommunityDto,
  ): Promise<CreateCommunityResponseDto> {
    const community =
      await this.communitiesRepositoryService.create(createCommunityDto);

    return plainToInstance(CreateCommunityResponseDto, community);
  }

  async search(
    searchCommunityDto: SearchCommunitiesDto,
  ): Promise<SearchCommunitiesResponseDto[]> {
    const communities =
      await this.communitiesRepositoryService.search(searchCommunityDto);

    return plainToInstance(SearchCommunitiesResponseDto, communities);
  }
}
