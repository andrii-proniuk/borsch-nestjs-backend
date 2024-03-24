import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, ILike } from 'typeorm';
import { Tag } from '../../entities/recipe/tags.entity';
import { SearchTagsDto } from '../../../tags/dto/get-tags.dto';
import { TAGS_SEARCH_COUNT } from '../../../tags/tags.constants';

@Injectable()
export class SearchTagsUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    { name }: SearchTagsDto,
    transactionManager?: EntityManager,
  ): Promise<Tag[]> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Tag).find({
      where: { name: ILike(`%${name}%`) },
      take: TAGS_SEARCH_COUNT,
    });
  }
}
