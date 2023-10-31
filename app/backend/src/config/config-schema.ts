export type DeploymentStage = 'dev' | 'prod';

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
  statusCallbackUrl: string;
}

export interface AppConfigSchema {
  stage: DeploymentStage;
  port: number;
  database: DatabaseConfig;
  allowedOrigins: string[];
  tokenSecret: string;
  expireIn: string;
}
