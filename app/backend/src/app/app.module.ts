import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataStoreOptions } from '../config/datastore.options';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot(dataStoreOptions()),
    UsersModule,
  ],
})
export class AppModule {}
