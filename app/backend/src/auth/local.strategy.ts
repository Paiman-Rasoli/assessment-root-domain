import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InvalidLoginCredentials, NotVerifiedException } from './errors';
import { VerifiedUser } from './dto/types.dto';
import { Status } from 'src/users/users.domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<VerifiedUser> {
    const verifiedUser = await this.authService.validateUser(email, password);

    if (!verifiedUser) {
      Logger.error('Invalid login credentials');
      throw new InvalidLoginCredentials();
    }

    if (verifiedUser.status !== Status.ACTIVE) {
      Logger.error('User is disabled.');
      throw new NotVerifiedException();
    }

    return verifiedUser;
  }
}