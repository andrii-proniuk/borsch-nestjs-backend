import { Module } from '@nestjs/common';
import { RecipesRepositoryModule } from '../repositories/recipes/recipes-repository.module';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [RecipesRepositoryModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
