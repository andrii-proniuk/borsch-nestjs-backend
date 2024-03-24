import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../entities/recipe/tags.entity';
import { TagsRepositoryService } from './tags-repository.service';
import { CreateTagsUseCase } from './use-cases/create-tags.usecase';
import { GetTagsUseCase } from './use-cases/get-tags.usecase';
import { GetTagUseCase } from './use-cases/get-tag.usecase';
import { SearchTagsUseCase } from './use-cases/search-tags.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [
    TagsRepositoryService,
    CreateTagsUseCase,
    GetTagsUseCase,
    GetTagUseCase,
    SearchTagsUseCase,
  ],
  exports: [TagsRepositoryService],
})
export class TagsRepositoryModule {}
