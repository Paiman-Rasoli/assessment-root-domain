import { RestReqUser, UserInfo } from '@app/utils';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async meAction(@RestReqUser() userInfo: UserInfo) {
    return this.usersService.me(userInfo.userId);
  }
}
