import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  GoogleSigninUnExpectedException,
  InvalidGoogleVerificationCodeException,
} from './errors';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor() {
    super();
  }
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      if (err.code === 'invalid_grant') {
        throw new InvalidGoogleVerificationCodeException(err.code);
      }

      throw new GoogleSigninUnExpectedException(err.message, err.status);
    }
    return user;
  }
}
