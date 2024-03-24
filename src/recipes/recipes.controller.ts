import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ValidatePayloadNotEmptyPipe } from '../common/pipes/validate-payload-not-empty.pipe';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Profile } from '../repositories/entities/profile/profile.entity';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CreateRecipeResponseDto } from './response-dto/create-recipe.response-dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post()
  @UseGuards(AuthGuard, )
  async create(
    @GetUser('profile') { id: authorId }: Profile,
    @Body(ValidatePayloadNotEmptyPipe) createRecipeDto: CreateRecipeDto,
  ): Promise<CreateRecipeResponseDto> {
    return this.recipesService.create(authorId, createRecipeDto);
  }
}
