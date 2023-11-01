import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private options: GoogleStrategyOptions) {
    super({
      clientID: options.clientID,
      clientSecret: options.clientSecret,
      callbackURL: options.callbackURL,
      scope: options.scopes,
      passReqToCallback: true,
    });
  }

  async authenticate(req, options) {
    super.authenticate(req, options);
  }

  async validate(
    req,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    };

    done(null, user);
  }
}

type Scope = 'email' | 'profile' | 'openid';

export interface GoogleStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scopes: Scope[];
}
