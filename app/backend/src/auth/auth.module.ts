import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../config/app-config.module';
import { UsersModule } from '../users/users.module';
import { AppConfigService } from '../config/app-config.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt-strategy';
import { AuthController } from './auth.controller';
import { OtvcModule } from '../otvc/otvc.module';
import { GoogleStrategy, GoogleStrategyOptions } from './google-strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => {
        return {
          secret: appConfigService.get('tokenSecret'),
          signOptions: {
            expiresIn: appConfigService.getExpireIn(),
            algorithm: 'HS256',
          },
        };
      },
      inject: [AppConfigService],
    }),
    OtvcModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: GoogleStrategy,
      useFactory: async (configService: AppConfigService) => {
        const googleConfig = await configService.get('google');

        const options: GoogleStrategyOptions = {
          clientSecret: googleConfig.secret,
          clientID: googleConfig.clientId,
          callbackURL: googleConfig.callbackUrl,
          scopes: ['email', 'profile'],
        };
        return new GoogleStrategy(options);
      },
      inject: [AppConfigService],
    },
  ],
})
export class AuthModule {}
