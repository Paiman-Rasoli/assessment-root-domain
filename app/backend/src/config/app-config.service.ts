import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AppConfigSchema,
  DatabaseConfig,
  DeploymentStage,
} from './config-schema';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<AppConfigSchema>) {}
  get<T extends keyof AppConfigSchema>(key: T): AppConfigSchema[T] {
    return this.configService.get(key);
  }
  getPort(): number {
    return this.get('port');
  }

  getStage(): DeploymentStage {
    return this.get('stage');
  }

  getDatabaseConfig(): DatabaseConfig {
    return this.get('database');
  }

  getAllowedOrigins(): string[] {
    return this.get('allowedOrigins');
  }

  getTokenSecret(): string {
    return this.get('tokenSecret');
  }

  getExpireIn(): string {
    return this.get('expireIn') || '60d';
  }
}
