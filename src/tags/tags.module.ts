import { Module } from '@nestjs/common';
import { TagsRepositoryModule } from '../repositories/tags/tags-repository.module';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [TagsRepositoryModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
