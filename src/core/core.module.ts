import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import configuration from '../config/configuration';
import { PostgresqlModule } from './postgresql/postgresql.module';
import { TransactionService } from './postgresql/transaction.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      level: 'warn',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MD', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    PostgresqlModule,
  ],
  exports: [
    PostgresqlModule,
    TransactionService,
  ],
  providers: [TransactionService],
})
export class CoreModule {}
