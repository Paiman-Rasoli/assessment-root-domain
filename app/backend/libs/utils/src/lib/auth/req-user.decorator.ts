import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserInfo {
  userId: number;
}

export const RestReqUser = createParamDecorator<UserInfo>(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
