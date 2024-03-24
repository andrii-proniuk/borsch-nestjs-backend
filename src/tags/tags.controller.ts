import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ValidatePayloadNotEmptyPipe } from '../common/pipes/validate-payload-not-empty.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TagsService } from './tags.service';
import { CreateTagResponseDto } from './response-dto/create-tag.response-dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagsResponseDto } from './response-dto/search-tags.response-dto';
import { SearchTagsDto } from './dto/get-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body(ValidatePayloadNotEmptyPipe) createTagDto: CreateTagDto,
  ): Promise<CreateTagResponseDto> {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  async search(
    @Query(ValidatePayloadNotEmptyPipe) searchTagsDto: SearchTagsDto,
  ): Promise<SearchTagsResponseDto> {
    return this.tagsService.search(searchTagsDto);
  }
}
