import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { VerifiedUser } from './dto/types.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<VerifiedUser> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await this.checkPassword(password, user.password);

    if (isMatch) {
      delete user.password;
      delete user.updatedAt;

      return { ...user, access_token: '' };
    }

    return null;
  }

  async login(user: VerifiedUser): Promise<VerifiedUser> {
    const payload = { userId: user.id };
    return { ...user, access_token: this.jwtService.sign(payload) };
  }

  private checkPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
