import { Injectable } from '@nestjs/common';
import { UsersRepository } from './datastore/users.repositrory';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
    //
  }
}
