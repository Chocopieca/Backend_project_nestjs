import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt} from 'passport-jwt';
import { Request } from 'express'

import { TokenService } from "src/token/token.service";
import { UserI } from "src/user/modules/user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate( req: Request, user: Partial<UserI> ) {
    const token = req.headers.authorization.slice(7)
    const tokenExists = await this.tokenService.exists(user.id, token);
    if(tokenExists) {
      return user;
    } else {
      throw new UnauthorizedException("User not sign in");
    }
  }
}