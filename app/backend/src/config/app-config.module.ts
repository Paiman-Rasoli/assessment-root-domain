import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { envProd } from './environments/env.prod';
import { envDev } from './environments/env.dev';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [process.env.STAGE === 'dev' ? envDev : envProd],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
