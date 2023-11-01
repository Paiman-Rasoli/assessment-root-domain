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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'User details with access token' })
  async loginAction(@Request() req: any, @Body() _: LoginInputDto) {
    console.log(_);
    // the body in here will comm through passport!
    return this.authService.login(req.user);
  }

  @Post('signup')
  @SkipAuth()
  @ApiResponse({ status: 500, description: 'If email taken' })
  @ApiResponse({
    status: 400,
    description: 'If password is not strong, firstName or password be null',
  })
  @ApiResponse({
    status: 200,
    description: 'Return true if user registered and ready for verify',
  })
  async registerAction(@Body() body: RegisterInputDto) {
    return this.authService.register(body);
  }

  @Post('verify')
  @SkipAuth()
  @ApiResponse({
    status: 200,
    description: 'Return user details with access token.',
  })
  @ApiResponse({
    status: 403,
    description: 'If verification code is expired or not found',
  })
  async verifyEmailAction(@Body() body: VerifyInputDto) {
    return this.authService.verify(body);
  }

  @ApiResponse({
    status: 200,
    description: 'Update the is_active field and return boolean',
  })
  @Post('logout')
  async logoutAction(@RestReqUser() userInfo: UserInfo) {
    return this.authService.logout(userInfo.userId);
  }

  @SkipAuth()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  @ApiResponse({
    status: 200,
    description: 'Return redirect url to google.',
  })
  @ApiResponse({
    status: 500,
    description: 'If configs is not setup correctly.',
  })
  async googleAuth() {
    return;
  }

  @SkipAuth()
  @Get('google/redirect')
  @ApiResponse({
    status: 302,
    description:
      'Create or Login a user by google details and redirect to front app with access token or error code',
  })
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

  @Post('reset-password')
  @ApiResponse({
    status: 400,
    description: 'If old password is not correct',
  })
  @ApiResponse({
    status: 200,
    description: 'Return true if password updates',
  })
  async resetPasswordAction(
    @RestReqUser() userInfo: UserInfo,
    @Body() body: ResetPasswordInput
  ) {
    return this.authService.resetPassword(userInfo.userId, body);
  }
}
