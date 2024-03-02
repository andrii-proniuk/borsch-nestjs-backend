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

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpirationTime: number;
  refreshTokenSecret: string;
  refreshTokenExpirationTime: number;
}
