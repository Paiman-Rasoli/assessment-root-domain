import { Injectable } from '@nestjs/common';
import { UsersRepository } from './datastore/users.repositrory';
import { UsersDomain } from './users.domain';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * usage: internal
   */
  async getByEmail(email: string): Promise<UsersDomain> {
    return this.usersRepository.findOneBy({ email: email });
  }
}
