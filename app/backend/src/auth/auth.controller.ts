import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, SkipAuth } from '@app/utils';
import { LoginInputDto } from './dto/inputs.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @SkipAuth()
  async loginAction(@Request() req: any, @Body() _: LoginInputDto) {
    console.log(_);

    return this.authService.login(req.user);
  }
}
