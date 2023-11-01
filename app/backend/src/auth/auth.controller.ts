import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, RestReqUser, SkipAuth, UserInfo } from '@app/utils';
import {
  LoginInputDto,
  RegisterInputDto,
  VerifyInputDto,
} from './dto/inputs.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
