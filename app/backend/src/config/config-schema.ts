export type DeploymentStage = 'dev' | 'prod';

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}

export interface EmailConfig {
  service_id: string;
  template_id: string;
  user_id: string;
  accessToken: string;
}

export interface GoogleConfig {
  secret: string;
  clientId: string;
  callbackUrl: string;
}

export interface AppConfigSchema {
  stage: DeploymentStage;
  port: number;
  database: DatabaseConfig;
  allowedOrigins: string[];
  tokenSecret: string;
  expireIn: string;
  email: EmailConfig;
  google: GoogleConfig;
}
