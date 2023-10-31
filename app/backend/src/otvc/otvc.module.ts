import { Module } from '@nestjs/common';
import { OtvcService } from './otvc.service';
import { TypeOrmModule } from '@app/db';
import { OtvcRepository } from './datastore/otvc.repositroy';
import { EmailHelper } from './helpers/email.helper';

@Module({
  imports: [TypeOrmModule.forRepository([OtvcRepository])],
  providers: [OtvcService, EmailHelper],
  exports: [OtvcService],
})
export class OtvcModule {}
