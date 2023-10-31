import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataStoreOptions } from '../config/datastore.options';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/utils';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot(dataStoreOptions()),
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
