import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { EmailModule } from './email/email.module';
import { TagsModule } from './tags/tags.module';
import { CommunitiesModule } from './communities/communities.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [CoreModule, AuthModule, EmailModule, TagsModule, CommunitiesModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
