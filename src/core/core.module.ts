import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { configurationValidationSchema } from '../config/configuration.validation-schema';
import { PostgresqlModule } from './postgresql/postgresql.module';
import { TransactionService } from './postgresql/transaction.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidationSchema,
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      level: 'warn',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Borsch', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    PostgresqlModule,
    JwtModule,
  ],
  exports: [PostgresqlModule, TransactionService, JwtModule],
  providers: [TransactionService],
})
export class CoreModule {}
