import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseConfig } from '../../config/configuration.types';

@Injectable()
export class PostgresqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, username, password, database } =
      this.configService.get<DatabaseConfig>('database');
    const environment = this.configService.get('environment');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities:
        environment === 'test'
          ? [process.cwd() + '/src/repositories/entities/**/*.entity.ts']
          : ['dist/src/repositories/entities/**/*.entity.js'],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      // logging: true,
    };
  }
}
