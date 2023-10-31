import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@app/db';
import { UsersRepository } from './datastore/users.repositrory';

@Module({
  imports: [TypeOrmModule.forRepository([UsersRepository])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
