export interface SwaggerConfig {
  isEnabled: boolean;
  user: string;
  password: string;
}

export interface CorsConfig {
  origins: string;
  methods: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpirationTime: string;
  refreshTokenSecret: string;
  refreshTokenExpirationTime: string;
}

export interface EmailConfig {
  clientId: string;
  clientSecret: string;
  defaultFrom: string;
  refreshToken: string;
}
