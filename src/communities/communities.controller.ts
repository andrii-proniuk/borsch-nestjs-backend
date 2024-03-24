import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ValidatePayloadNotEmptyPipe } from '../common/pipes/validate-payload-not-empty.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { CreateCommunityResponseDto } from './response-dto/create-community.response-dto';
import { SearchCommunitiesResponseDto } from './response-dto/search-community.response-dto';
import { SearchCommunitiesDto } from './dto/search-community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private communitiesService: CommunitiesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body(ValidatePayloadNotEmptyPipe) createCommunityDto: CreateCommunityDto,
  ): Promise<CreateCommunityResponseDto> {
    return this.communitiesService.create(createCommunityDto);
  }

  @Get()
  async search(
    @Query(ValidatePayloadNotEmptyPipe)
    searchCommunitiesDto: SearchCommunitiesDto,
  ): Promise<SearchCommunitiesResponseDto[]> {
    return this.communitiesService.search(searchCommunitiesDto);
  }
}
