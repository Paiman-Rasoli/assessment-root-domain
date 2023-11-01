import { RestReqUser, UserInfo } from '@app/utils';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateInputDto } from './dto/inputs.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Return current user by accessToken',
  })
  @ApiResponse({
    status: 401,
    description: 'If user does not have a valid token',
  })
  async meAction(@RestReqUser() userInfo: UserInfo) {
    return this.usersService.me(userInfo.userId);
  }

  @Put('me')
  @ApiResponse({
    status: 200,
    description: 'Return true if profile updated',
  })
  @ApiResponse({
    status: 401,
    description: 'If user does not have a valid token',
  })
  async updateMeAction(
    @RestReqUser() userInfo: UserInfo,
    @Body() body: UpdateInputDto
  ) {
    return this.usersService.update(userInfo.userId, body);
  }

  @Get('analytic')
  @ApiResponse({
    status: 200,
    description: 'Return details about users in the system',
  })
  @ApiResponse({
    status: 401,
    description: 'If user does not have a valid token',
  })
  async analyticAction() {
    return this.usersService.analytic();
  }
}
