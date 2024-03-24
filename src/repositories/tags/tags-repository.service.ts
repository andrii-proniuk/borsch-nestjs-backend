import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { Tag } from '../entities/recipe/tags.entity';
import { SearchTagsDto } from '../../tags/dto/get-tags.dto';
import { CreateTagsUseCase } from './use-cases/create-tags.usecase';
import { GetTagsUseCase } from './use-cases/get-tags.usecase';
import { GetTagUseCase } from './use-cases/get-tag.usecase';
import { SearchTagsUseCase } from './use-cases/search-tags.usecase';

@Injectable()
export class TagsRepositoryService {
  // eslint-disable-next-line max-params
  constructor(
    private createTagsUseCase: CreateTagsUseCase,
    private getTagsUseCase: GetTagsUseCase,
    private getTagUseCase: GetTagUseCase,
    private searchTagsUseCase: SearchTagsUseCase,
  ) {}

  async create(name: string, transactionManager?: EntityManager): Promise<Tag> {
    const [tag] = await this.createTagsUseCase.exec([name], transactionManager);

    return tag;
  }

  async createMany(
    names: string[],
    transactionManager?: EntityManager,
  ): Promise<Tag[]> {
    return this.createTagsUseCase.exec(names, transactionManager);
  }

  async search(
    getTagsDto: SearchTagsDto,
    transactionManager?: EntityManager,
  ): Promise<Tag[]> {
    return this.searchTagsUseCase.exec(getTagsDto, transactionManager);
  }

  async getById(id: number, transactionManager?: EntityManager): Promise<Tag> {
    return this.getTagUseCase.exec({ id }, transactionManager);
  }

  async getByIds(ids: number[], transactionManager): Promise<Tag[]> {
    return this.getTagsUseCase.exec({ id: In(ids) }, transactionManager);
  }
}
