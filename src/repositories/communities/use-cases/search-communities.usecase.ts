import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, ILike } from 'typeorm';
import { Community } from '../../entities/community/community.entity';
import { SearchCommunitiesDto } from '../../../communities/dto/search-community.dto';
import { getPagination } from '../../../common/helpers/pagination.helper';

@Injectable()
export class SearchCommunitiesUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    searchCommunitiesDto: SearchCommunitiesDto,
    transactionManager?: EntityManager,
  ): Promise<Community[]> {
    const entityManager = transactionManager || this.globalEntityManager;

    const { name } = searchCommunitiesDto;
    const { skip, take } = getPagination(searchCommunitiesDto);

    return entityManager.getRepository(Community).find({
      where: { name: ILike(`%${name}%`) },
      skip,
      take,
    });
  }
}
