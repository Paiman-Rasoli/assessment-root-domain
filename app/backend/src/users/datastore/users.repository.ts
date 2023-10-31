import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { TypeOrmEntityRepository } from '@app/db';

@Injectable()
@TypeOrmEntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {}
