import { RestReqUser, UserInfo } from '@app/utils';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateInputDto } from './dto/inputs.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async meAction(@RestReqUser() userInfo: UserInfo) {
    return this.usersService.me(userInfo.userId);
  }

  @Put('me')
  async updateMeAction(
    @RestReqUser() userInfo: UserInfo,
    @Body() body: UpdateInputDto
  ) {
    return this.usersService.update(userInfo.userId, body);
  }
}
