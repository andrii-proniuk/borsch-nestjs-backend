/* eslint-disable complexity */

export default () => ({
  environment: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  origins: process.env.ORIGINS,
  cors: {
    origins: process.env.ORIGINS || 'http://localhost:3000',
    methods: process.env.METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
  },
  swagger: {
    isEnabled: process.env.SWAGGER_ENABLED === 'true',
    user: process.env.SWAGGER_USER || 'admin',
    password: process.env.SWAGGER_PASSWORD || 'admin',
  },
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
    accessTokenExpirationTime:
      parseInt(process.env.JSW_ACCESS_TOKEN_EXPIRATION_TIME) || 28800,
  },
});
