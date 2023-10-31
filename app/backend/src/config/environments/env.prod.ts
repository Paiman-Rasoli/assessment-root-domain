import { AppConfigSchema } from '../config-schema';

export const envProd = (): AppConfigSchema => ({
  stage: 'prod',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  allowedOrigins: [],
  tokenSecret: process.env.AUTH_TOKEN_SECRET,
  expireIn: process.env.EXPIRE_IN,
});
