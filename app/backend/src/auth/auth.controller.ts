import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, SkipAuth } from '@app/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @SkipAuth()
  async loginAction(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
