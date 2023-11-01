import { Injectable } from '@nestjs/common';
import { UsersRepository } from './datastore/users.repository';
import { SignupMode, Status, UsersDomain } from './users.domain';
import { UserCreateInput } from './dto/inputs.dto';
import { DuplicateUserException, UnauthorizedException } from './errors';
import * as bcrypt from 'bcrypt';
import { UpdatableUser, WritableUser } from './datastore/users.entity';
import { User } from './dto/types.dto';
import { mapDomainToDto } from './dto.mapper';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async me(userId): Promise<User> {
    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.status !== Status.ACTIVE) {
      throw new UnauthorizedException();
    }

    return mapDomainToDto(user);
  }

  async update(userId: number, user: UpdatableUser): Promise<boolean> {
    const update = await this.usersRepository.update({ id: userId }, user);
    return update.affected > 0;
  }

  /**
   * usage: internal
   */
  async getByEmail(email: string): Promise<UsersDomain> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async create(input: UserCreateInput): Promise<UsersDomain> {
    const find = await this.getByEmail(input.email);

    if (find) {
      throw new DuplicateUserException(input.email);
    }

    const newUser = {
      ...input,
      updatedAt: new Date(),
    } as WritableUser;

    if (input.signupMode === SignupMode.EMAIL) {
      newUser.password = await bcrypt.hash(input.password, 10);
      newUser.status = Status.INACTIVE;
      newUser.isActive = false;
    } else {
      newUser.status = Status.ACTIVE;
      newUser.isActive = true;
    }
    return this.usersRepository.save(newUser);
  }

  async verifyUser(userId: number): Promise<UsersDomain> {
    const actions = await Promise.all([
      this.usersRepository.update(
        { id: userId },
        { status: Status.ACTIVE, isActive: true, updatedAt: new Date() }
      ),
      this.usersRepository.findOneBy({ id: userId }),
    ]);

    return actions[1];
  }
}
