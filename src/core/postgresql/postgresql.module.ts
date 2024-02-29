import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresqlConfigService } from './postgresql-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresqlConfigService,
    }),
  ],
  providers: [PostgresqlConfigService],
})
export class PostgresqlModule {}
