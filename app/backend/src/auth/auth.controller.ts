import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard, RestReqUser, SkipAuth, UserInfo } from '@app/utils';
import {
  LoginInputDto,
  RegisterInputDto,
  ResetPasswordInput,
  VerifyInputDto,
} from './dto/inputs.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOauthGuard } from '@app/utils/lib/auth/google-oauth-guard';
import { AppConfigService } from '../config/app-config.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: AppConfigService
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @SkipAuth()
  async loginAction(@Request() req: any, @Body() _: LoginInputDto) {
    console.log(_);
    // the body in here will comm through passport!
    return this.authService.login(req.user);
  }

  @Post('signup')
  @SkipAuth()
  async registerAction(@Body() body: RegisterInputDto) {
    return this.authService.register(body);
  }

  @Post('verify')
  @SkipAuth()
  async verifyEmailAction(@Body() body: VerifyInputDto) {
    return this.authService.verify(body);
  }

  @Post('logout')
  async logoutAction(@RestReqUser() userInfo: UserInfo) {
    return this.authService.logout(userInfo.userId);
  }

  @SkipAuth()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    return;
  }

  @SkipAuth()
  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    //create account  with Google account_type if not exist and generate redirect params
    const result = await this.authService.loginGoogle(req.user);
    if (result.errorCode) {
      return res.redirect(
        `${this.configService.get('webUrl')}/login?error=${result.errorCode}`
      );
    }
    return res.redirect(
      `${this.configService.get('webUrl')}/login?access_token=${
        result.accessToken
      }`
    );
  }

  async resetPasswordAction(
    @RestReqUser() userInfo: UserInfo,
    @Body() body: ResetPasswordInput
  ) {
    return this.authService.resetPassword(userInfo.userId, body);
  }
}
