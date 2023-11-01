import { RestReqUser, UserInfo } from '@app/utils';
import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async meAction(@RestReqUser() userInfo: UserInfo) {
    return this.usersService.me(userInfo.userId);
  }
}
