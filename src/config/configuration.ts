/* eslint-disable complexity */

export default () => ({
  environment: process.env.NODE_ENV,
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
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
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || '15m',
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
    refreshTokenExpirationTime:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '30d',
  },
  email: {
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    defaultFrom: process.env.EMAIL_DEFAULT_FROM,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
  },
});
