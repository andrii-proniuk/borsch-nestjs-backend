import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { DeepPartial, EntityManager } from 'typeorm';
import { Tag } from '../../entities/recipe/tags.entity';

@Injectable()
export class CreateTagsUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    names: string[],
    transactionManager?: EntityManager,
  ): Promise<Tag[]> {
    const entityManager = transactionManager || this.globalEntityManager;
    const tagsRepository = entityManager.getRepository(Tag);

    const tagsEntities: DeepPartial<Tag>[] = names.map((name) => ({ name }));

    return tagsRepository.save(tagsEntities);
  }
}
