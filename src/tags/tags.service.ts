import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TagsRepositoryService } from '../repositories/tags/tags-repository.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateTagResponseDto } from './response-dto/create-tag.response-dto';
import { SearchTagsResponseDto } from './response-dto/search-tags.response-dto';
import { SearchTagsDto } from './dto/get-tags.dto';

@Injectable()
export class TagsService {
  constructor(private tagsRepositoryService: TagsRepositoryService) {}

  async create(
    { name }: CreateTagDto,
    transactionManager?: EntityManager,
  ): Promise<CreateTagResponseDto> {
    const tag = await this.tagsRepositoryService.create(
      name,
      transactionManager,
    );

    return plainToInstance(CreateTagResponseDto, tag);
  }

  async search(searchTagsDto: SearchTagsDto): Promise<SearchTagsResponseDto> {
    const tags = await this.tagsRepositoryService.search(searchTagsDto);

    return plainToInstance(SearchTagsResponseDto, { tags });
  }
}
