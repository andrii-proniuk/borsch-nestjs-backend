import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CommunitiesRepositoryService } from '../../repositories/communities/communities-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { BadRequestException } from '../../common/exceptions/http.exception';
import { RECIPES_ERRORS } from '../recipes.constants';
import { isInt, isPositive } from 'class-validator';

@Injectable()
export class CommunityExistsBaseGuard implements CanActivate {
  constructor(
    private communitiesRepositoryService: CommunitiesRepositoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { communityId } = req.body;

    if (!communityId) {
      return true;
    }

    if (!isInt(communityId) || !isPositive(communityId)) {
      throw new BadRequestException({
        code
      });
    }

    const community =
      await this.communitiesRepositoryService.getById(communityId);

    if (!community) {
      throw new BadRequestException({
        code: RECIPES_ERRORS.COMMUNITY_NOT_FOUND,
        property: 'communityId',
      });
    }

    return true;
  }
}
