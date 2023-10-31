import { AppConfigSchema } from '../config-schema';

export const envDev = (): AppConfigSchema => ({
  stage: 'dev',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  allowedOrigins: ['http://localhost:4200', 'http://localhost:4300'],
  tokenSecret: process.env.AUTH_TOKEN_SECRET,
  expireIn: process.env.EXPIRE_IN,
  email: {
    service_id: process.env.EMAIL_SERVICE_ID,
    template_id: process.env.EMAIL_TEMPLATE_ID,
    user_id: process.env.EMAIL_USER_ID,
    accessToken: process.env.EMAIL_ACCESS_TOKE,
  },
});
