import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { VerifiedUser } from './dto/types.dto';
import { RegisterInputDto } from './dto/inputs.dto';
import { SignupMode } from '../users/users.domain';

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

      return { ...user, access_token: '' };
    }

    return null;
  }

  async login(user: VerifiedUser): Promise<VerifiedUser> {
    const payload = { userId: user.id };
    return { ...user, access_token: this.jwtService.sign(payload) };
  }

  async register(input: RegisterInputDto): Promise<VerifiedUser> {
    const user = await this.usersService.create({
      ...input,
      signupMode: SignupMode.EMAIL,
    });
    delete user.password;
    return { ...user, access_token: this.jwtService.sign({ userId: user.id }) };
  }

  private checkPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
