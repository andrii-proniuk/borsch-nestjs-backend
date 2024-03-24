import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Community } from '../../entities/community/community.entity';
import { CreateCommunityDto } from '../../../communities/dto/create-community.dto';

@Injectable()
export class CreateCommunityUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    createCommunityDto: CreateCommunityDto,
    transactionManager?: EntityManager,
  ): Promise<Community> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Community).save(createCommunityDto);
  }
}
