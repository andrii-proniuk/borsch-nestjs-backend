import * as Joi from 'joi';

export const configurationValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  ORIGINS: Joi.string().optional(),
  METHODS: Joi.string().optional(),
  SWAGGER_ENABLED: Joi.boolean().default(true),
  SWAGGER_USER: Joi.string().default('admin'),
  SWAGGER_PASSWORD: Joi.string().default('admin'),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  EMAIL_CLIENT_ID: Joi.string().required(),
  EMAIL_CLIENT_SECRET: Joi.string().required(),
  EMAIL_DEFAULT_FROM: Joi.string().email().required(),
  EMAIL_REFRESH_TOKEN: Joi.string().required(),
});
