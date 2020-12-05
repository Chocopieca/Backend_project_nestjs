import { createParamDecorator } from "@nestjs/common";
import { UserI } from 'src/user/modules/user.interface'

export const GetUser = createParamDecorator(
  (req, data): UserI => req.user,
)