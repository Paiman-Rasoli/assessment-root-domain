import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GoogleResponse, VerifiedUser } from './dto/types.dto';
import { RegisterInputDto, VerifyInputDto } from './dto/inputs.dto';
import { SignupMode, Status } from '../users/users.domain';
import { OtvcService } from '../otvc/otvc.service';
import { Scope } from '../otvc/otvc.domain';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly otvcService: OtvcService
  ) {}

  async validateUser(email: string, password: string): Promise<VerifiedUser> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await this.checkPassword(password, user.password);

    if (isMatch) {
      delete user.password;
      await this.usersService.update(user.id, {
        isActive: false,
        updatedAt: new Date(),
      });
      return { ...user, access_token: '' };
    }

    return null;
  }

  async login(user: VerifiedUser): Promise<VerifiedUser> {
    const payload = { userId: user.id };
    return { ...user, access_token: this.jwtService.sign(payload) };
  }

  async loginGoogle(user): Promise<GoogleResponse> {
    const findUser = await this.usersService.getByEmail(user.email);

    if (findUser) {
      if (findUser.signupMode === SignupMode.EMAIL) {
        return {
          errorCode: 'INVALID_MODE',
        };
      }
      if (findUser.status === Status.DISABLED) {
        return {
          errorCode: 'DISABLED',
        };
      }
      return {
        accessToken: this.jwtService.sign({ userId: findUser.id }),
      };
    }
    console.log('User by google', user);
    // signup by google
    const newUser = await this.usersService.create({
      signupMode: SignupMode.GOOGLE,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: '',
    });

    return {
      accessToken: this.jwtService.sign({ userId: newUser.id }),
    };
  }

  async logout(userId: number): Promise<boolean> {
    return this.usersService.update(userId, {
      isActive: false,
      updatedAt: new Date(),
    });
  }

  async register(input: RegisterInputDto): Promise<boolean> {
    const user = await this.usersService.create({
      ...input,
      signupMode: SignupMode.EMAIL,
    });
    delete user.password;

    await this.otvcService.create(
      user.id,
      user.email,
      `${user.firstName} ${user.lastName}`,
      Scope.EMAIL_VERIFY
    );

    return true;
  }

  async verify(input: VerifyInputDto): Promise<VerifiedUser> {
    const otvc = await this.otvcService.findOne(
      Number(input.code),
      Scope.EMAIL_VERIFY
    );

    const user = await this.usersService.verifyUser(otvc.userId);
    await this.otvcService.removeOne(otvc.code);

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
