import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response} from 'express'
import { TokenDto } from 'src/auth/modules/dto/logout.dto';

import { tokenPayloadI } from 'src/auth/modules/token-payload.interface';
import { AuthService } from 'src/auth/service/auth.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class TokenCheck implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userToken: TokenService
    ) {}

  async use(req: Request, res: Response, next: Function) {
    // let token = req.headers.authorization
    // if(token) {
    //   token = token.slice(7)
    //   const extract = await this.authService.verifyToken(token)
    //   console.log(extract);
    //   const dateNow = new Date().getTime()
    //   const leftTime = -(Math.floor(dateNow/1000 - extract.exp))
    //   console.log(leftTime);
      
    //   if(leftTime <= 0) {
    //     this.userToken.delete(extract.id, token)
    //   }
    // }

    const tokens = await this.userToken.findAll()

    tokens.forEach( async userToken => {    
      try {
      const {token} = userToken
      const extract = await this.authService.verifyToken(userToken.token)
      } catch(err) {
        const {token, userid} = userToken
        const test = await this.userToken.delete(userid, token)
      }
    })
    next()
  }
}




// export function TokenCheck(req: Request, res: Response, next: Function) {
//   const token = req.headers.authorization.slice(7)
//   console.log('Request: ===>', token);
//   next()
// }

