import { Injectable } from '@nestjs/common';
import { EntityManager, ILike } from 'typeorm';
import { CreateCommunityDto } from '../../communities/dto/create-community.dto';
import { Community } from '../entities/community/community.entity';
import { SearchCommunitiesDto } from '../../communities/dto/search-community.dto';
import { CreateCommunityUseCase } from './use-cases/create-community.usecase';
import { GetCommunityUseCase } from './use-cases/get-community.usecase';
import { GetCommunitiesUseCase } from './use-cases/get-communities.usecase';
import { SearchCommunitiesUseCase } from './use-cases/search-communities.usecase';

@Injectable()
export class CommunitiesRepositoryService {
  // eslint-disable-next-line max-params
  constructor(
    private createCommunityUseCase: CreateCommunityUseCase,
    private getCommunityUseCase: GetCommunityUseCase,
    private getCommunitiesUseCase: GetCommunitiesUseCase,
    private searchCommunitiesUseCase: SearchCommunitiesUseCase,
  ) {}

  async create(
    createCommunityDto: CreateCommunityDto,
    transactionManager?: EntityManager,
  ): Promise<Community> {
    return this.createCommunityUseCase.exec(
      createCommunityDto,
      transactionManager,
    );
  }

  async getById(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<Community> {
    return this.getCommunityUseCase.exec({ id }, transactionManager);
  }

  async getByName(
    name: string,
    transactionManager?: EntityManager,
  ): Promise<Community[]> {
    return this.getCommunitiesUseCase.exec(
      { name: ILike(`%${name}%`) },
      transactionManager,
    );
  }

  async search(
    searchCommunitiesDto: SearchCommunitiesDto,
    transactionManager?: EntityManager,
  ): Promise<Community[]> {
    return this.searchCommunitiesUseCase.exec(
      searchCommunitiesDto,
      transactionManager,
    );
  }
}
