import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { CorsConfig, SwaggerConfig } from './config/configuration.types';
import { AnyExceptionFilter } from './errors.filter';
import { BadRequestException } from './common/exceptions/http.exception';
import { ICustomValidationError } from './common/interfaces/custom-validation-error.interface';

const setupCors = (app) => {
  const configService: ConfigService = app.get(ConfigService);

  const { methods } = configService.get<CorsConfig>('cors');

  app.enableCors({
    // origin: origins.split(','),
    methods,
  });
};

const composeSwaggerDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle('MDPeople API')
    .setDescription('The MDPeople API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', in: 'header' }, 'default')
    .addBearerAuth({ type: 'http', in: 'header' }, 'refresh')
    .build();

  return SwaggerModule.createDocument(app, options);
};

const setupSwagger = (app) => {
  const configService: ConfigService = app.get(ConfigService);

  const { isEnabled, user, password } =
    configService.get<SwaggerConfig>('swagger');

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: 'none',
    },
  };

  if (isEnabled) {
    app.use(
      ['/swagger', '/swagger-json'],
      basicAuth({ challenge: true, users: { [user]: password } }),
    );
    SwaggerModule.setup(
      'swagger',
      app,
      composeSwaggerDocument(app),
      customOptions,
    );
  }
};

const createValidationPipe = () => {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
    stopAtFirstError: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new BadRequestException({
        validationErrors: errors.map<ICustomValidationError>((error) => ({
          property: error.property,
          code: Object.values(error.constraints)[0],
        })),
      });
    },
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  setupCors(app);
  setupSwagger(app);
  app.useGlobalPipes(createValidationPipe());
  app.useGlobalFilters(
    new AnyExceptionFilter(
      app.get(WINSTON_MODULE_NEST_PROVIDER),
      app.get(HttpAdapterHost),
    ),
  );

  await app.listen(configService.get<number>('port'));
}

bootstrap();
