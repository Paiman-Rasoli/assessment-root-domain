import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GoogleResponse, VerifiedUser } from './dto/types.dto';
import {
  RegisterInputDto,
  ResetPasswordInput,
  VerifyInputDto,
} from './dto/inputs.dto';
import { SignupMode, Status } from '../users/users.domain';
import { OtvcService } from '../otvc/otvc.service';
import { Scope } from '../otvc/otvc.domain';
import { PasswordNotMatchException } from './errors';

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

    if (user.signupMode === SignupMode.GOOGLE) {
      return { ...user, access_token: '' };
    }

    const isMatch = await this.checkPassword(password, user.password);

    if (isMatch) {
      delete user.password;
      await this.usersService.update(user.id, {
        isActive: true,
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
      // update activity status
      await this.usersService.update(findUser.id, {
        isActive: true,
        updatedAt: new Date(),
      });

      return {
        accessToken: this.jwtService.sign({ userId: findUser.id }),
      };
    }
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
    await Promise.all([
      this.otvcService.removeOne(otvc.code),
      this.usersService.update(user.id, {
        isActive: true,
        updatedAt: new Date(),
      }),
    ]);

    delete user.password;

    return { ...user, access_token: this.jwtService.sign({ userId: user.id }) };
  }

  async resetPassword(
    userId: number,
    input: ResetPasswordInput
  ): Promise<boolean> {
    const findUser = await this.usersService.getById(userId);

    const oldMatch = await this.checkPassword(
      input.oldPassword,
      findUser.password
    );

    if (!oldMatch) {
      throw new PasswordNotMatchException();
    }
    const hashed = await bcrypt.hash(input.newPassword, 10);
    return this.usersService.update(userId, { password: hashed });
  }

  private checkPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
