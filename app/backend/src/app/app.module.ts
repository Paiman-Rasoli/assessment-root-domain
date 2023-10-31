import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataStoreOptions } from '../config/datastore.options';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forRoot(dataStoreOptions())],

})
export class AppModule {}
