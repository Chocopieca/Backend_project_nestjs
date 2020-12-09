import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserTokenI } from 'src/token/modules/user_token.inteface';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): UserTokenI => {
  const req = ctx.switchToHttp().getRequest()  
  return req.user;
});